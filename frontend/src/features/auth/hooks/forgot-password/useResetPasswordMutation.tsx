import type { ServerRes } from '@/shared/types/serverResponse.type';
import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import apiInstance from '@/shared/lib/apiInstance';
import { toast } from 'sonner';
import { useLocation, useNavigate } from 'react-router-dom';
import type { ResetPasswordType } from '../../schemas/forgot-password/resetPassword.schema';
import type { UseFormSetError } from 'react-hook-form';

export const useResetPasswordMutation = ({
  setError,
}: {
  setError: UseFormSetError<ResetPasswordType>;
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  let resetToken: string | null;
  if (location.state && location.state.resetToken) {
      resetToken = location.state.resetToken;
    } else {
        resetToken = null;
    }
    console.log(resetToken)

  return useMutation<ServerRes, AxiosError<ServerRes>, ResetPasswordType>({
    mutationFn: async (data) => {
      const payload = { ...data, resetToken };
      const res = await apiInstance.post('/auth/reset-password', payload);
      return res.data;
    },
    onSuccess: (data) => {
      if (data.message) {
        toast.success(data.message);
      }
      setTimeout(() => {
        navigate('/auth?mode=login');
      }, 1000);
    },
    onError: (error) => {
      const isValidationError = error.response?.data?.errors;
      if (
        error.response?.data.message === 'Validation Error' &&
        isValidationError
      ) {
        isValidationError.map((err) => {
          setError(err.field as keyof ResetPasswordType, {
            message: err.message,
            type: 'serverError',
          });
        });
      } else {
        toast.error(error.response?.data.message);
      }
    },
  });
};
