import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps
  extends Omit<React.ComponentProps<'input'>, 'size'> {
  icon?: React.ReactNode;
  inputSize?: 'default' | 'xl';
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, type, icon, name, id, inputSize = 'default', ...props },
    ref,
  ) => {
    const inputName = name ?? id ?? 'input';
    const sizeClass =
      inputSize === 'xl'
        ? 'rounded-[120px] md:px-[28px] px-3 py-2'
        : 'rounded-[12px] px-3 py-2';
    return (
      <div
        className={cn(
          'flex items-center w-full border border-secondary bg-background',
          icon ? 'gap-[10px]' : '',
          sizeClass,
        )}
      >
        {icon && (
          <span className="text-gray-400 pointer-events-none flex-shrink-0">
            {icon}
          </span>
        )}
        <input
          type={type}
          data-slot="input"
          name={inputName}
          id={id}
          className={cn(
            'flex-1 h-10 bg-transparent outline-none border-none file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            className,
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);

Input.displayName = 'Input';

export { Input };
