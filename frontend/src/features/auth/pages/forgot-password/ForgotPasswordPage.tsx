import { AuthLayout } from "../../components/AuthLayout"
import { ForgotPasswordForm } from "../../forms/forgot-password/ForgotPasswordForm"

export const ForgotPasswordPage = () => {
  return (
    <AuthLayout
      title="Forgot Your Password?"
      desc="Enter your email to receive a password reset otp."
    >
      <ForgotPasswordForm />
    </AuthLayout>
  );
}
