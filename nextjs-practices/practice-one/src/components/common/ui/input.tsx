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
        ? 'rounded-4xl md:px-[28px] px-3 py-2'
        : 'rounded-xl px-3 py-2';
    return (
      <div
        className={cn(
          'flex w-full items-center border border-secondary bg-background',
          icon ? 'gap-[10px]' : '',
          sizeClass,
        )}
      >
        {icon && (
          <span className="pointer-events-none flex-shrink-0 text-gray-400">
            {icon}
          </span>
        )}
        <input
          type={type}
          data-slot="input"
          name={inputName}
          id={id}
          className={cn(
            'file:text-foreground placeholder:text-muted-foreground h-10 flex-1 border-none bg-transparent outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
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
