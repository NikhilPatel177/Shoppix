import { Document, Schema, Model, HydratedDocument, model } from 'mongoose';
import bcrypt from 'bcryptjs';

export type OtpPurpose = 'verify_email' | 'forgot_password';
export interface IOtp extends Document {
  email: string;
  otpCode: string;
  purpose: OtpPurpose;
  attempts: number;
  lockedUntil?: Date;
  createdAt: Date;
  updatedAt: Date;

  compareOtp(enteredOtp: string): Promise<boolean>;
}

const otpSchema = new Schema<IOtp, Model<IOtp>, IOtp>(
  {
    email: { type: String, required: true, unique: true },
    otpCode: { type: String, maxlength: 6, required: true },
    purpose: {
      type: String,
      enum: ['verify_email', 'forgot_password'] as OtpPurpose[],
      default: 'verify_email',
    },
    attempts: { type: Number, dafault: 0 },
    lockedUntil: Date,
  },
  { timestamps: true }
);

otpSchema.pre('save', async function (next) {
  const user = this as HydratedDocument<IOtp>;

  if (!user.isModified('otpCode') || !user.otpCode) return next();

  const salt = await bcrypt.genSalt(10);
  user.otpCode = await bcrypt.hash(user.otpCode, salt);
  next();
});

otpSchema.methods.compareOtp = async function (enteredOtp): Promise<boolean> {
  return bcrypt.compare(enteredOtp, this.otpCode!);
};

const OtpModel = model<IOtp>('Otp', otpSchema);
export default OtpModel;
