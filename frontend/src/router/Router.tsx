import { useRoutes } from 'react-router-dom';
import { appRoutes } from './AppRoutes';

export const AppRouter = () => {
  const router = useRoutes([...appRoutes]);

  return router;
};
