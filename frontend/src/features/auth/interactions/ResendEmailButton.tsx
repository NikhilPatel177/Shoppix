import { useAuthStore } from '@/shared/strore/useAuthStore';
import type { ServerRes } from '@/shared/types/serverResponse.type';
import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import clsx from 'clsx';
import type React from 'react';
import apiInstance from '@/shared/lib/apiInstance';
import { toast } from 'sonner';

type ResendEmailButtonProps = {
  children: React.ReactNode;
  purpose: 'verify_email' | 'forgot_password';
  className?: string;
};

type ResendPayload = {
  email: string | undefined;
  purpose: 'forgot_password' | 'verify_email';
};

export const ResendEmailButton = ({
  children,
  purpose,
  className,
}: ResendEmailButtonProps) => {
  const { user } = useAuthStore();

  const { mutate, isPending } = useMutation<
    ServerRes,
    AxiosError<ServerRes>,
    ResendPayload
  >({
    mutationFn: async (data) => {
      const res = await apiInstance.post('/auth/resend-email', data);
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (err) => {
      toast.error(err.response?.data.message);
    },
  });

  function SendResendCode() {
    if (!user?.email) return;
    mutate({ email: user.email, purpose });
  }

  return (
    <button
      className={clsx(
        'cursor-pointer text-primary text-sm my-1 disabled:opacity-50',
        className
      )}
      onClick={SendResendCode}
      disabled={isPending}
    >
      {isPending ? 'Sending...' : children}
    </button>
  );
};
