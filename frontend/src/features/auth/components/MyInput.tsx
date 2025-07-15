import { Input } from '@/shared/components/ui/input';
import clsx from 'clsx';
import { Eye, EyeOff } from 'lucide-react';
import type React from 'react';
import { useState } from 'react';
import { type Path, type FieldValues, useFormContext } from 'react-hook-form';

type MyInputProps<T extends FieldValues> = {
  type?: React.HTMLInputTypeAttribute;
  autoComplete?: React.HTMLInputAutoCompleteAttribute;
  name: Path<T>;
  label: string;
};

export const MyInput = <T extends FieldValues>({
  type = 'text',
  autoComplete,
  name,
  label,
}: MyInputProps<T>) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<T>();
  const [canViewPassword, setCanViewPassword] = useState<boolean>(false);
  const isTypePassword =
    type === 'password' && name.toLowerCase().includes('password');
  const currentType = isTypePassword && canViewPassword ? 'text' : type;
  const fieldError = errors[name];

  function guessAutoComplete(
    name: string
  ): React.HTMLInputAutoCompleteAttribute {
    const actualName = name.toLowerCase();
    if (actualName.includes('email')) return 'email';
    if (actualName.includes('password')) return 'current-password';
    if (actualName.includes('name')) return 'name';
    return 'on';
  }
  return (
    <div className="grid gap-1">
      <label htmlFor={name}>{label}</label>
      <div className="relative">
        <Input
          type={currentType}
          id={name}
          {...register(name)}
          autoComplete={autoComplete ?? guessAutoComplete(name)}
          className={clsx(fieldError && 'ring-red-500')}
        />
        {isTypePassword && (
          <button
            type="button"
            tabIndex={-1}
            className="text-gray-500 absolute top-1/2 -translate-1/2 right-0"
            onClick={() => setCanViewPassword((prev) => !prev)}
          >
            {canViewPassword ? <EyeOff /> : <Eye />}
          </button>
        )}
      </div>
      {fieldError && (
        <p className="text-sm mt-1 text-red-500">
          {fieldError.message as string}
        </p>
      )}
    </div>
  );
};
