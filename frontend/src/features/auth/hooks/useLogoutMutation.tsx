import { useMutation } from '@tanstack/react-query';
import apiInstance from '@/shared/lib/apiInstance';
import type { ServerRes } from '@/shared/types/serverResponse.type';
import { useAuthStore } from '@/shared/strore/useAuthStore';
import type { AxiosError } from 'axios';
import { toast } from 'sonner';

export const useLogoutMutation = () => {
  const { clearAuth } = useAuthStore();

  return useMutation<ServerRes, AxiosError<ServerRes>>({
    mutationFn: async () => {
      const res = await apiInstance.post('/auth/logout', {});
      return res.data;
    },
    onSuccess: (data) => {
      if (data.message) {
        toast.success(data.message);
      }
      setTimeout(() => {
        clearAuth();
        window.location.reload();
      }, 1000);
    },
    onError: (error) => {
      toast.error(error.response?.data.message);
    },
  });
};
