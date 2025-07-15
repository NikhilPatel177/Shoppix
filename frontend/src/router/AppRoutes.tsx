import { authRoutes } from '@/features/auth/AuthRoutes';
import { AppLayout } from '@/shared/layouts/AppLayout';
import { Route, Routes } from 'react-router-dom';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<h1>home page</h1>} />

        {authRoutes.map((route, i) => (
          <Route key={`auth-${i}`} path={route.path} element={route.element} />
        ))}
      </Route>
    </Routes>
  );
};
