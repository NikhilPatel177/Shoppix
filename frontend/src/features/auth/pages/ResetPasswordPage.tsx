import { AuthLayout } from '../components/AuthLayout';
import { ResetPasswordForm } from '../forms/ResetPasswordForm';

export const ResetPasswordPage = () => {
  return (
    <AuthLayout
      title="Reset Password"
      description="Enter a strong new password to help you login soon!"
    >
      <ResetPasswordForm />
    </AuthLayout>
  );
};
