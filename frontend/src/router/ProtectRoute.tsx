import { useAuthStore } from '@/shared/strore/useAuthStore';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const ProtectRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.pathname

  useEffect(() => {
    if (!user) {
      navigate(`/auth?mode=register&from=${from}`);
    }
  }, [user, navigate,from]);

  if (!user) return null;

  return <>{children}</>;
};
