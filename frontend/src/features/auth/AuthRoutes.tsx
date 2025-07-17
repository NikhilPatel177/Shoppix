import type { RouteObject } from 'react-router-dom';
import { AuthPage } from './pages/AuthPage';
import { VerifyEmailPage } from './pages/VerifyEmailPage';
import { ForgotPasswordPage } from './pages/forgot-password/ForgotPasswordPage';
import { VerifyOtpPage } from './pages/forgot-password/VerifyOtpPage';
import { ResetPasswordPage } from './pages/forgot-password/ResetPasswordPage';
import { GuestOnly } from '@/router/GuestOnlyRoute';

export const authRoutes: RouteObject[] = [
  {
    path: '/auth',
    element: (
      <GuestOnly>
        <AuthPage />
      </GuestOnly>
    ),
  },
  {
    path: '/verify-email',
    element: (
      <GuestOnly>
        <VerifyEmailPage />
      </GuestOnly>
    ),
  },
  {
    path: '/forgot-password',
    element: (
      <GuestOnly>
        <ForgotPasswordPage />{' '}
      </GuestOnly>
    ),
  },
  {
    path: '/forgot-password/verify-otp',
    element: (
      <GuestOnly>
        <VerifyOtpPage />
      </GuestOnly>
    ),
  },
  {
    path: '/forgot-password/reset-password',
    element: (
      <GuestOnly>
        <ResetPasswordPage />
      </GuestOnly>
    ),
  },
];
