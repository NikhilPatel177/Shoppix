import type { RouteObject } from 'react-router-dom';
import { ProfilePage } from './pages/ProfilePage';
import { AddressPage } from './pages/AddressPage';

export const accountRoutes: RouteObject[] = [
  { path: '/profile', element: <ProfilePage /> },
  { path: '/address', element: <AddressPage /> },
];
