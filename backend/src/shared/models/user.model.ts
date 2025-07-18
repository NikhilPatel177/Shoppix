import { Schema, Model, HydratedDocument, model } from 'mongoose';
import bcrypt from 'bcryptjs';
import { IUser, providers } from '../types/IUser.type';
import { addressSchema } from './address.model';

const userSchema = new Schema<IUser, Model<IUser>, IUser>(
  {
    fullName: {
      firstName: String,
      lastName: String,
    },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: {
      type: String,
      required: function () {
        return !this.googleProviderId;
      },
    },
    provider: {
      type: [String],
      enum: ['credentials', 'google'] as providers[],
      default: ['credentials'],
    },
    googleProviderId: String,
    avatar: String,
    roles: {
      type: [String],
      enum: ['buyer', 'seller', 'admin'],
      default: ['buyer'],
      select: false,
    },
    activeRole: {
      type: String,
      enum: ['buyer', 'seller', 'admin'],
      default: 'buyer',
    },
    refreshToken: String,
    passwordResetToken: String,
    addresses: [addressSchema],
    phone:{type:String},

    isPhoneVerified: { type: Boolean, default: false },
    isEmailVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  const user = this as HydratedDocument<IUser>;

  if (!user.isModified('password') || !user.password) return next();

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (
  enteredPassword
): Promise<boolean> {
  return bcrypt.compare(enteredPassword, this.password!);
};

const UserModel = model<IUser>('User', userSchema);
export default UserModel;
