import type { RouteObject } from 'react-router-dom';
import { AuthPage } from './pages/AuthPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { ResetPasswordPage } from './pages/ResetPasswordPage';
import { SetPasswordPage } from './pages/SetPasswordPage';

export const authRoutes: RouteObject[] = [
  { path: '/auth', element: <AuthPage /> },
  { path: '/forgot_password', element: <ForgotPasswordPage /> },
  { path: '/reset_password', element: <ResetPasswordPage /> },
  { path: '/set_password', element: <SetPasswordPage /> },
];
