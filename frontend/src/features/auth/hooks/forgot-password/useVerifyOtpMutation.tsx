import { useMutation } from '@tanstack/react-query';
import apiInstance from '@/shared/lib/apiInstance';
import { useNavigate } from 'react-router-dom';
import type { ServerRes } from '@/shared/types/serverResponse.type';
import type { AxiosError } from 'axios';
import { toast } from 'sonner';

export const useVerifyOtpMutation = () => {
  const navigate = useNavigate();

  return useMutation<
    ServerRes,
    AxiosError<ServerRes>,
    {
      otpCode: string;
      email: string | undefined;
    }
  >({
    mutationFn: async (data) => {
      const res = await apiInstance.post('/auth/verify-otp', data);
      return res.data;
    },
    onSuccess: (data) => {
      if (data.message) {
        toast.success(data.message, { duration: 1000 });
      }
      setTimeout(() => {
        navigate('/forgot-password/reset-password', {
          state: { resetToken: data?.data.resetToken || null },
        });
      }, 1000);
    },
    onError: (err) => {
      toast.error(
        err.response?.data.message || 'Something went wrong,Try later'
      );
    },
  });
};
