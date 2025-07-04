import mongoose, { Schema, Document, Model } from 'mongoose';
import bcrypt from 'bcryptjs';

type Roles = 'seller' | 'client' | 'admin';

export interface IUser extends Document {
  fullName: {
    firstName: string;
    lastName: string;
  };
  email: string;
  password: string;
  profileImg: string;
  provider: ('google' | 'credentials')[];
  providerId: string;
  role: Roles[];
  activeRole: Roles;
  isVerified: boolean;
  verifiedAt: Date;
  createdAt: Date;
  refreshToken: string;
  updatedAt: Date;
  id: string;

  comparePassword(enteredPassword: string): Promise<boolean>;
}

const userSchema: Schema<IUser> = new Schema<IUser>(
  {
    fullName: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      index: true,
    },
    password: {
      type: String,
      required: function (this: IUser) {
        return !this.providerId;
      },
      select: false,
    },
    profileImg: String,
    provider: {
      type: [String],
      enum: ['google', 'credentials'],
      default: ['credentials'],
    },
    providerId: String,
    role: {
      type: [String],
      enum: ['seller', 'admin', 'client'],
      default: ['client'],
      select: false,
    },
    activeRole: {
      type: String,
      enum: ['seller', 'admin', 'client'],
      default: 'client',
    },
    isVerified: { type: Boolean, default: false },
    verifiedAt: Date,
    refreshToken: { type: String, select: false },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (enteredPassword: string) {
  return bcrypt.compare(enteredPassword, this.password);
};

export const UserModel: Model<IUser> = mongoose.model<IUser>(
  'User',
  userSchema
);
