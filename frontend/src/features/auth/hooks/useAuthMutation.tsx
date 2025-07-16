import { useMutation } from '@tanstack/react-query';
import type { AuthSchemaType } from '../schemas/auth.schema';
import apiInstance from '@/shared/lib/apiInstance';
import type { ServerRes } from '@/shared/types/serverResponse.type';
import { useAuthStore } from '@/shared/strore/useAuthStore';
import { useNavigate, useSearchParams } from 'react-router-dom';
import type { AxiosError } from 'axios';
import type { UseFormSetError } from 'react-hook-form';
import { toast } from 'sonner';

export const useAuthMutation = ({
  setError,
}: {
  setError: UseFormSetError<AuthSchemaType>;
}) => {
  const { setToken, setUser } = useAuthStore();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('from') || '/';

  return useMutation<
    ServerRes,
    AxiosError<ServerRes>,
    AuthSchemaType,
    { mode: 'register' | 'login' }
  >({
    mutationFn: async (data) => {
      const { mode, ...payload } = data;
      const endpoint = mode === 'register' ? '/auth/register' : '/auth/login';
      const res = await apiInstance.post(endpoint, payload);
      return res.data;
    },
    onMutate: (variables) => {
      return { mode: variables.mode };
    },
    onSuccess: (data, _variables, context) => {
      setToken(data.accessToken);
      setUser(data.data);
      const mode = context?.mode;
      if (data.message) {
        toast.success(data.message, { duration: 900 });
      }
      setTimeout(() => {
        if (mode === 'register') {
          navigate(`/verify-email?from=${redirectTo}`);
        } else {
          navigate(redirectTo);
        }
      }, 1000);
    },
    onError: (error) => {
      const isValidationError = error.response?.data?.errors;
      if (
        error.response?.data.message === 'Validation Error' &&
        isValidationError
      ) {
        isValidationError.map((err) => {
          setError(err.field as keyof AuthSchemaType, {
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
