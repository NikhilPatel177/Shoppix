import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MyInput } from '../../components/MyInput';
import { Button } from '@/shared/components/ui/button';
import {
  forgotPasswordSchema,
  type ForgotPasswordType,
} from '../../schemas/forgot-password/forgotPassword.schema';
import { useForgotPasswordMutation } from '../../hooks/forgot-password/useForgotPasswordMutation';
import { Loading } from '@/shared/components/Loading';
import { CircleCheckBig } from 'lucide-react';

export const ForgotPasswordForm = () => {
  const form = useForm<ForgotPasswordType>({
    resolver: zodResolver(forgotPasswordSchema),
  });
  const { mutate, isPending, isSuccess } = useForgotPasswordMutation();

  function handleOnSubmit(data: ForgotPasswordType) {
    mutate(data);
  }

  return (
    <FormProvider {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(handleOnSubmit)}>
        <MyInput name="email" label="Email" />

        <Button variant={isSuccess ? 'success' : 'default'}>
          {isPending ? (
            <Loading />
          ) : isSuccess ? (
            <CircleCheckBig />
          ) : (
            'Send Otp'
          )}
        </Button>
      </form>
    </FormProvider>
  );
};
