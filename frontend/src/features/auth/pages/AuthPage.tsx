import { useEffect, useState } from 'react';
import { AuthLayout } from '../components/AuthLayout';
import { RegisterForm } from '../forms/RegisterForm';
import { GoogleOauthButton } from '../interactions/GoogleOauthButton';
import { useSearchParams } from 'react-router-dom';
import { LoginForm } from '../forms/LoginForm';

export const AuthPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const param = searchParams.get('mode') as 'login' | 'register' | null;
  const [mode, setMode] = useState<'register' | 'login'>(
    param === 'login' ? 'login' : 'register'
  );

  useEffect(() => {
    setSearchParams({ mode });
  }, [setSearchParams, mode]);

  return (
    <AuthLayout
      title={
        mode === 'register'
          ? 'Create your Shoppix Account'
          : 'Welcome back to Shoppix'
      }
      description={
        mode === 'register'
          ? 'Join Shoppix today and unlock personalized shopping, exclusive deals, and a seamless checkout experience.'
          : 'Sign in to track your orders, access your wishlist, and enjoy a faster checkout experience.'
      }
    >
      <div>
        {mode === 'register' ? <RegisterForm /> : <LoginForm />}
        <div className="flex items-center gap-4 my-2">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="text-sm text-gray-500 font-medium">OR</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>
        <GoogleOauthButton />

        <div className="text-center font-medium text-muted-foreground space-x-2 my-2">
          <span>
            {mode === 'register'
              ? 'Already have an account?'
              : "Don't have an account?"}
          </span>
          <button
            type="button"
            className="underline text-primary"
            onClick={() =>
              setMode((prev) => (prev === 'login' ? 'register' : 'login'))
            }
          >
            {mode === 'register' ? 'Login' : 'Register'}
          </button>
        </div>
      </div>
    </AuthLayout>
  );
};
