import type { ServerRes } from '@/shared/types/serverResponse.type';
import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import type { ForgotPasswordType } from '../../schemas/forgot-password/forgotPassword.schema';
import apiInstance from '@/shared/lib/apiInstance';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export const useForgotPasswordMutation = () => {
  const navigate = useNavigate();

  return useMutation<ServerRes, AxiosError<ServerRes>, ForgotPasswordType>({
    mutationFn: async (data) => {
      const res = await apiInstance.post('/auth/forgot-password', data);
      return res.data;
    },
    onSuccess: (data,variables) => {
      if (data.message) {
        toast.success(data.message);
      }
      setTimeout(() => {
        navigate(`/forgot-password/verify-otp?email=${variables.email}`);
      }, 1000);
    },
    onError: (err) => {
      toast.error(err.response?.data.message);
    },
  });
};
