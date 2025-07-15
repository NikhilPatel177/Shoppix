import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AuthLayout } from '../components/AuthLayout';
import { AuthForm } from '../forms/AuthForm';
import { GoogleOauthButton } from '../interactions/GoolgOauthButton';

export const AuthPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const modeParam = searchParams.get('mode') as 'login' | 'register' | null;
  const [mode, setMode] = useState<'register' | 'login'>(
    modeParam === 'login' ? 'login' : 'register'
  );

  useEffect(() => {
    if (mode !== searchParams.get('mode')) {
      setSearchParams({ mode });
    }
  }, [mode, setSearchParams, searchParams]);

  return (
    <AuthLayout
      title={
        mode === 'register'
          ? 'create your shoppix account'
          : 'welcome back to shoppix'
      }

      desc={
        mode === 'register'
          ? 'Sign up to start shopping smarter and faster with Shoppix.'
          : 'Log in to access your account and discover great deals.'
      }
    >   
      <div>
        {/* Auth Form Includes Both Register And Login */}
        <AuthForm mode={mode} />

        {/* Divider */}
        <div className="w-full grid grid-cols-[45%_10%_45%] items-center my-2">
          <span className="border-t-2 border-gray-200" />
          <span className="text-center text-gray-400">OR</span>
          <span className="border-t-2 border-gray-200" />
        </div>

        {/* Google Oauth Button */}
        <GoogleOauthButton />

        {/* Mode Changer */}
        <div className="my-2 flex justify-center w-full gap-1">
          <span className="text-gray-500">
            {mode === 'register'
              ? 'Already have an account?'
              : "Don't have an account?"}
          </span>
          <button
            type="button"
            className="text-primary underline"
            onClick={() =>
              setMode((prev) => (prev === 'login' ? 'register' : 'login'))
            }
          >
            {mode === 'register' ? 'Register' : 'Login'}
          </button>
        </div>
      </div>
    </AuthLayout>
  );
};
