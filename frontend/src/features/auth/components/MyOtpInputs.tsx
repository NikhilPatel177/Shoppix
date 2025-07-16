import { Input } from '@/shared/components/ui/input';
import type React from 'react';
import { useEffect, useRef } from 'react';

type MyOtpInputsProps = {
  otp: string[];
  setOtp: React.Dispatch<React.SetStateAction<string[]>>;
};

export const MyOtpInputs = ({ otp, setOtp }: MyOtpInputsProps) => {
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  function handleOnChange(value: string, index: number) {
    if (!/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && inputsRef.current[index + 1]) {
      inputsRef.current[index + 1]?.focus();
    }
  }

  function handleBackspace(
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) {
    if (e.key === 'Backspace') {
      e.preventDefault();
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);

      if (inputsRef.current[index - 1]) {
        inputsRef.current[index - 1]?.focus();
      }
    }
  }

  function handlePaste(e: React.ClipboardEvent<HTMLInputElement>) {
    e.preventDefault();
    const pasteValue = e.clipboardData.getData('text').replace(/\D/g, '');
    const newOtp = [...otp];

    for (let i = 0; i < pasteValue.length && i < otp.length; i++) {
      newOtp[i] = pasteValue[i];
    }

    setOtp(newOtp);
    const nextIndex = Math.min(pasteValue.length, otp.length - 1);
    inputsRef.current[nextIndex]?.focus();
  }
  
  return (
    <div className="flex gap-2">
      {otp.map((digit, index) => (
        <Input
          key={index}
          type="text"
          className="w-10 h-10 text-center"
          maxLength={1}
          inputMode="numeric"
          value={digit}
          onChange={(e) => handleOnChange(e.target.value, index)}
          ref={(el) => {
            inputsRef.current[index] = el;
          }}
          onKeyDown={(e) => handleBackspace(e, index)}
          onPaste={(e) => handlePaste(e)}
        />
      ))}
    </div>
  );
};
