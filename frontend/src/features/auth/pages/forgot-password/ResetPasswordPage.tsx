import { AuthLayout } from "../../components/AuthLayout"
import { ResetPasswordForm } from "../../forms/forgot-password/ResetPasswordForm"

export const ResetPasswordPage = () => {
  return (
    <AuthLayout title="Set a New Password" desc="Create a secure password to regain access to your account.">
      <ResetPasswordForm />
    </AuthLayout>
  );
}
