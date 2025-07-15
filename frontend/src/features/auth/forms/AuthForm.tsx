import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MyInput } from '../components/MyInput';
import { Button } from '@/shared/components/ui/button';
import { StrongPasswordCheckUi } from '../components/StrongPasswordCheckUi';
import { authSchema, type AuthSchemaType } from '../schemas/auth.schema';
import { useEffect } from 'react';
import { useAuthMutation } from '../hooks/useAuthMutation';
import { Loading } from '@/shared/components/Loading';
import { CircleCheckBig } from 'lucide-react';

export const AuthForm = ({ mode }: { mode: 'register' | 'login' }) => {
  const form = useForm<AuthSchemaType>({ resolver: zodResolver(authSchema) });
  useEffect(() => {
    form.setValue('mode', mode);
    form.setValue('password', '');
  }, [mode, form]);

  const { mutate: AuthMutate, isPending, isSuccess } = useAuthMutation();

  function handleFormSubmit(data: AuthSchemaType) {
    AuthMutate(data);
  }

  return (
    <FormProvider {...form}>
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit(handleFormSubmit)}
      >
        <MyInput name="email" label="Email" />
        <MyInput name="password" label="Password" type="password" />

        {mode === 'register' && (
          <StrongPasswordCheckUi password={form.watch('password')} />
        )}
        <Button
          variant={isSuccess ? 'success' : 'default'}
          disabled={isPending}
        >
          {isSuccess ? (
            <CircleCheckBig className="animate-scaleIn" />
          ) : isPending ? (
            <Loading />
          ) : mode === 'register' ? (
            'Create Account'
          ) : (
            'Login'
          )}
        </Button>
      </form>
    </FormProvider>
  );
};
