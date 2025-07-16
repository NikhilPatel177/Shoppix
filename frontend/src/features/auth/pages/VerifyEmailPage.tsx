import { AuthLayout } from '../components/AuthLayout';
import { VerifyEmailForm } from '../forms/VerifyEmailForm';

export const VerifyEmailPage = () => {
  return (
    <AuthLayout
      title="Verify Your Email"
      desc="Confirm your email to activate your Shoppix account"
    >
      <VerifyEmailForm />
    </AuthLayout>
  );
};
