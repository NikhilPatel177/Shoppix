import { AppLayout } from '@/shared/layouts/AppLayout';
import { useRoutes } from 'react-router-dom';

export const AppRoutes = () => {
  const routes = useRoutes([{ path: '/', element: <AppLayout /> }]);

  return routes;
};
