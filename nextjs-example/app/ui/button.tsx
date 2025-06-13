import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'default' | 'outline';
}

export function Button({
  children,
  className,
  variant = 'default',
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      className={clsx(
        'flex h-10 items-center rounded-lg px-4 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50',
        {
          'bg-blue-500 text-white hover:bg-blue-400': variant === 'default',
          'border border-gray-200 bg-white text-gray-600 hover:bg-gray-100':
            variant === 'outline',
        },
        className
      )}
    >
      {children}
    </button>
  );
}
