import { useAuthStore } from '@/shared/strore/useAuthStore';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const GuestOnly = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  if (user) return null;

  return <>{children}</>;
};
