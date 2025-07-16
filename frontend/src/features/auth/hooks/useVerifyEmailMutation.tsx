import { useMutation } from '@tanstack/react-query';
import apiInstance from '@/shared/lib/apiInstance';
import { useNavigate, useSearchParams } from 'react-router-dom';
import type { ServerRes } from '@/shared/types/serverResponse.type';
import type { AxiosError } from 'axios';
import { toast } from 'sonner';

export const useVerifyEmailMutation = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('from') || '/';

  return useMutation<
    ServerRes,
    AxiosError<ServerRes>,
    {
      otpCode: string;
      email: string | undefined;
    }
  >({
    mutationFn: async (data) => {
      const res = await apiInstance.post('/auth/verify-email', data);
      return res.data;
    },
    onSuccess: (data) => {
      if (data.message) {
        toast.success(data.message, { duration: 1000 });
      }
      setTimeout(() => {
        navigate(redirectTo);
      }, 1000);
    },
    onError: (err) => {
      toast.error(
        err.response?.data.message || 'Something went wrong,Try later'
      );
    },
  });
};
