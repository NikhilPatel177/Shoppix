import { AuthLayout } from '../../components/AuthLayout';
import { VerifyOtpForm } from '../../forms/forgot-password/VerifyOtpForm';

export const VerifyOtpPage = () => {
  return (
    <AuthLayout
      title="Enter Otp to Continue"
      desc="Check your email for the code and verify your identity."
    >
      <VerifyOtpForm />
    </AuthLayout>
  );
};
