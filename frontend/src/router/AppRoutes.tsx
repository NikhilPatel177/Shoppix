import { authRoutes } from '@/features/auth/AuthRoutes';
import { AppLayout } from '@/shared/layouts/AppLayout';
import { Route, Routes } from 'react-router-dom';
import { ProtectRoute } from './ProtectRoute';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<h1>home page</h1>} />
        <Route path="/cart" element={<ProtectRoute><h1>Cart page</h1></ProtectRoute>} />
        <Route path="/wishlist" element={<ProtectRoute><h1>Wishlist page</h1></ProtectRoute>} />

        {authRoutes.map((route, i) => (
          <Route key={`auth-${i}`} path={route.path} element={route.element} />
        ))}
      </Route>
    </Routes>
  );
};
