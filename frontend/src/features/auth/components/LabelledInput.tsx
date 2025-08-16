import { cn } from '@common/utils/cn';
import { Eye, EyeOff } from 'lucide-react';
import type React from 'react';
import { useState } from 'react';

type LabelledInputProps = {
  name: string;
  label: string;
  wrapperCn?: string;
  labelCn?: string;
  inputCn?: string;
  type?: React.HTMLInputTypeAttribute;
  autoComplete?: React.HTMLInputAutoCompleteAttribute;
};

function autoCompleteFn(name: string): React.HTMLInputAutoCompleteAttribute {
  const loweredName = name.toLowerCase();

  if (loweredName === 'email') return 'email';

  if (loweredName === 'firstname' || loweredName === 'first-name')
    return 'given-name';
  if (loweredName === 'lastname' || loweredName === 'last-name')
    return 'family-name';

  if (
    loweredName.includes('newpassword') ||
    loweredName.includes('new-password')
  )
    return 'new-password';

  if (loweredName === 'password' || loweredName.includes('password'))
    return 'current-password';

  return 'off';
}

export const LabelledInput = ({
  name,
  label,
  wrapperCn,
  labelCn,
  inputCn,
  type = 'text',
  autoComplete
}: LabelledInputProps) => {
  const [canViewPass, setCanViewPass] = useState<boolean>(false);
  return (
    <div className={cn('my-3 space-y-1', wrapperCn)}>
      <label htmlFor={name} className={cn('font-medium', labelCn)}>
        {label}
      </label>
      <div className="relative">
        <input
          type={
            type === 'password' ? (canViewPass ? 'text' : 'password') : type
          }
          id={name}
          name={name}
          className={cn(
            'border-2 border-border rounded-md block w-full outline-0 p-2 hover:border-muted-foreground focus:border-primary',
            inputCn
          )}
          autoComplete={autoComplete ?? autoCompleteFn(name)}
        />
        {type === 'password' && (
          <button
            type="button"
            className="absolute z-10 right-0 top-1/2 -translate-1/2"
            onClick={() => setCanViewPass((prev) => !prev)}
          >
            {canViewPass ? <EyeOff /> : <Eye />}
          </button>
        )}
      </div>
    </div>
  );
};
