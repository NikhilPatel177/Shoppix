import { useMutation } from '@tanstack/react-query';
import type { AuthSchemaType } from '../schemas/auth.schema';
import apiInstance from '@/shared/lib/apiInstance';
import type { ServerRes } from '@/shared/types/serverResponse.type';
import { useAuthStore } from '@/shared/strore/useAuthStore';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const useAuthMutation = () => {
  const { setToken, setUser } = useAuthStore();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('from') || '/';
  return useMutation({
    mutationFn: async (data: AuthSchemaType) => {
      const { mode, ...payload } = data;
      const endpoint = mode === 'register' ? '/auth/register' : '/auth/login';
      const res = await apiInstance.post(endpoint, payload);
      return res.data;
    },
    onSuccess: (data: ServerRes) => {
      setToken(data.accessToken);
      setUser(data.data);
      setTimeout(() => {
        navigate(redirectTo);
      }, 1000);
    },
  });
};
