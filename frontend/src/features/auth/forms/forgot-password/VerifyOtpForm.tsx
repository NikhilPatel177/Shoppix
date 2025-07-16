import { Button } from '@/shared/components/ui/button';
import { MyOtpInputs } from '../../components/MyOtpInputs';
import { Loading } from '@/shared/components/Loading';
import { CircleCheckBig } from 'lucide-react';
import { ResendEmailButton } from '../../interactions/ResendEmailButton';
import { useState } from 'react';
import { useVerifyOtpMutation } from '../../hooks/forgot-password/useVerifyOtpMutation';
import { useSearchParams } from 'react-router-dom';

export const VerifyOtpForm = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [errMsg, setErrMsg] = useState<string>('');

  const { mutate, isPending, isSuccess } = useVerifyOtpMutation();
  const [searchParams] = useSearchParams();

  function handleOnSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (otp.some((digit) => digit === '')) {
      setErrMsg('Please fill all fields');
      return;
    }

    const data = {
      otpCode: otp.join(''),
      email: searchParams.get('email') || 'wrong@gmail.com',
    };
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
            'Verify Otp'
          )}
        </Button>
      </form>

      <div className="flex w-full justify-end">
        <ResendEmailButton purpose="forgot_password" className="text-end my-3">
          Resend Otp
        </ResendEmailButton>
      </div>
    </>
  );
};
