import { AuthLayout } from '../components/AuthLayout';
import { ForgotPasswordForm } from '../forms/ForgotPasswordForm';

export const ForgotPasswordPage = () => {
  return (
    <AuthLayout
      title="Forgot Your Password?"
      description="Enter your email and we'll sent you a reset password link to your email."
      canNavigateBack={true}
    >
      <ForgotPasswordForm />
    </AuthLayout>
  );
};
