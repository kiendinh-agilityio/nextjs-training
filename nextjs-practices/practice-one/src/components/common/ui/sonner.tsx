'use client';

import { useTheme } from 'next-themes';
import { Toaster as Sonner } from 'sonner';
import { CheckCircle, XCircle } from 'lucide-react';

const icons = {
  success: <CheckCircle className="text-emerald-400 w-6 h-6 mr-3" />,
  error: <XCircle className="text-rose-400 w-6 h-6 mr-3" />,
};

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      icons={icons}
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
          title: 'text-base font-semibold',
          description: 'group-[.toast]:text-muted-foreground',
          actionButton:
            'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
          cancelButton:
            'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
          loader: '!bg-emerald-400',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
