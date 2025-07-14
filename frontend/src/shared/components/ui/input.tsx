import * as React from 'react';

import { cn } from '@/shared/lib/utils';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'w-full text-sm rounded-md ring-2 ring-slate-100 py-2 px-3 focus-within:outline-0 focus-within:ring-primary',
        className
      )}
      {...props}
    />
  );
}

export { Input };
