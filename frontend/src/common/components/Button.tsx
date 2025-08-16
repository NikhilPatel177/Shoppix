import { cn } from '@common/utils/cn';
import type React from 'react';

type ButtonProps = {
  type?: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
  onclick?: () => void;
  className?: string;
};

export const Button = ({
  type = 'button',
  children,
  onclick,
  className,
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={cn(
        'p-2 bg-primary border-2 border-primary w-full text-white font-medium rounded-md hover:bg-primary-dark hover:border-primary-dark',
        className
      )}
      onClick={onclick}
    >
      {children}
    </button>
  );
};
