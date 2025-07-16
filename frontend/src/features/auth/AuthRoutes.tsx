import type { RouteObject } from 'react-router-dom';
import { AuthPage } from './pages/AuthPage';
import { VerifyEmailPage } from './pages/VerifyEmailPage';
import { ForgotPasswordPage } from './pages/forgot-password/ForgotPasswordPage';
import { VerifyOtpPage } from './pages/forgot-password/VerifyOtpPage';
import { ResetPasswordPage } from './pages/forgot-password/ResetPasswordPage';

export const authRoutes: RouteObject[] = [
  { path: '/auth', element: <AuthPage /> },
  { path: '/verify-email', element: <VerifyEmailPage /> },
  { path: '/forgot-password', element: <ForgotPasswordPage /> },
  { path: '/forgot-password/verify-otp', element: <VerifyOtpPage /> },
  { path: '/forgot-password/reset-password', element: <ResetPasswordPage /> },
];
