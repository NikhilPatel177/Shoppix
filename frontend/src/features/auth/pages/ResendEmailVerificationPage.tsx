import { AuthLayout } from '../components/AuthLayout';
import { ResendEmailVerificationForm } from '../forms/ResendEmailVerificationForm';

export const ResendEmailVerificationPage = () => {
  return (
    <AuthLayout
      title="Resend Email Verification"
      description="Make sure your email is verified to activate your account. If you didn't receive the link, we'll send it again."
      canNavigateBack={true}
    >
      <ResendEmailVerificationForm />
    </AuthLayout>
  );
};
