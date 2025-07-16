import { useState } from 'react';
import { MyOtpInputs } from '../components/MyOtpInputs';
import { Button } from '@/shared/components/ui/button';
import { ResendEmailButton } from '../interactions/ResendEmailButton';
import { useVerifyEmailMutation } from '../hooks/useVerifyEmailMutation';
import { CircleCheckBig } from 'lucide-react';
import { useAuthStore } from '@/shared/strore/useAuthStore';
import { Loading } from '@/shared/components/Loading';

export const VerifyEmailForm = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [errMsg, setErrMsg] = useState<string>('');

  const { mutate, isPending, isSuccess } = useVerifyEmailMutation();
  const { user } = useAuthStore();

  function handleOnSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (otp.some((digit) => digit === '')) {
      setErrMsg('Please fill all fields');
      return;
    }

    const data = { otpCode: otp.join(''), email: user?.email };
    mutate(data);
  }
  return (
    <>
      <form className="flex flex-col gap-6 pt-4" onSubmit={handleOnSubmit}>
        <div className="self-center">
          <MyOtpInputs otp={otp} setOtp={isSuccess ? () => {} : setOtp} />
          {errMsg && <p className="mt-2 text-sm text-red-500">{errMsg}</p>}
        </div>
        <Button
          className="max-w-100 mx-auto"
          disabled={isPending}
          variant={isSuccess ? 'success' : 'default'}
        >
          {isPending ? (
            <Loading />
          ) : isSuccess ? (
            <CircleCheckBig />
          ) : (
            'Verify Email'
          )}
        </Button>
      </form>

      <div className="flex w-full justify-end">
        <ResendEmailButton purpose="verify_email" className="text-end my-3">
          Resend Otp
        </ResendEmailButton>
      </div>
    </>
  );
};
