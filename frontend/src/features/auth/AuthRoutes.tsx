import type { RouteObject } from 'react-router-dom';
import { AuthPage } from './pages/AuthPage';
import { VerifyEmailPage } from './pages/VerifyEmailPage';

export const authRoutes: RouteObject[] = [
  { path: '/auth', element: <AuthPage /> },
  { path: '/verify-email', element: <VerifyEmailPage /> },
];
