import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MyInput } from '../../components/MyInput';
import { Button } from '@/shared/components/ui/button';
import { StrongPasswordCheckUi } from '../../components/StrongPasswordCheckUi';
import {
  resetPasswordSchema,
  type ResetPasswordType,
} from '../../schemas/forgot-password/resetPassword.schema';
import { useResetPasswordMutation } from '../../hooks/forgot-password/useResetPasswordMutation';
import { Loading } from '@/shared/components/Loading';
import { CircleCheckBig } from 'lucide-react';

export const ResetPasswordForm = () => {
  const form = useForm<ResetPasswordType>({
    resolver: zodResolver(resetPasswordSchema),
  });
  const { mutate,isSuccess,isPending } = useResetPasswordMutation({ setError: form.setError });

  function handleOnSubmit(data: ResetPasswordType) {
    mutate(data);
  }
  return (
    <FormProvider {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(handleOnSubmit)}>
        <MyInput name="newPassword" label="New Password" type="password" />
        <StrongPasswordCheckUi password={form.watch('newPassword')} />
        <MyInput
          name="confirmNewPassword"
          label="Confirm New Password"
          type="password"
        />
        <Button variant={isSuccess ? 'success' : 'default'}>
          {isPending ? (
            <Loading />
          ) : isSuccess ? (
            <CircleCheckBig />
          ) : (
            'Reset Password'
          )}
        </Button>
      </form>
    </FormProvider>
  );
};
