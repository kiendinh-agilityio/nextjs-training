import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-white hover:bg-orange-600',
        secondary: 'bg-secondary text-white hover:bg-navy-900',
        tertiary: 'bg-success text-white hover:bg-green-800',
      },
      size: {
        sm: 'h-[61px] py-[17px] px-[27px] text-[18px] leading-[24px]',
        lg: 'h-[70] py-[18px] px-[20px] text-[24px] leading-[24px]',
        full: 'w-full h-12 px-8 text-base',
        icon: 'h-[40px] w-[40px] p-0 flex items-center justify-center',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'sm',
    },
  },
);

const Spinner = ({ className }: { className?: string }) => {
  return (
    <svg
      className={cn('mr-2 h-4 w-4 animate-spin', className)}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        className="opacity-25"
        cx="8"
        cy="8"
        r="7"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M15 8a7 7 0 01-7 7V13a5 5 0 005-5h2z"
      />
    </svg>
  );
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
  icon?: React.ReactNode;
  ariaLabel: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      isLoading = false,
      disabled,
      icon,
      children,
      ariaLabel,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isLoading || disabled}
        aria-label={ariaLabel}
        {...props}
      >
        {isLoading && <Spinner />}
        {icon && <span className="mr-2 flex items-center">{icon}</span>}
        {children}
      </Comp>
    );
  },
);

Button.displayName = 'Button';

export { Button, buttonVariants };
