import type { RouteObject } from 'react-router-dom';
import { AuthPage } from './pages/AuthPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { ResetPasswordPage } from './pages/ResetPasswordPage';

export const authRoutes: RouteObject[] = [
  { path: '/auth', element: <AuthPage /> },
  { path: '/forgot_password', element: <ForgotPasswordPage /> },
  { path: '/reset_password', element: <ResetPasswordPage /> },
];
