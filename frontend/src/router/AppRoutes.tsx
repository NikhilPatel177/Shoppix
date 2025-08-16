import type { RouteObject } from 'react-router-dom';
import { AppLayout } from '@common/layouts';
import { authRoutes } from '@features/auth';

export const appRoutes: RouteObject[] = [
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <h1>home page</h1> },
      { path: '/cart', element: <h1>cart page</h1> },
      { path: '/wishlist', element: <h1>wishlist page</h1> },
      ...authRoutes,
    ],
  },
];
