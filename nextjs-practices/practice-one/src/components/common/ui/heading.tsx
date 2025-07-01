import * as React from 'react';

import { cn } from '@/lib/utils';

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  size?: 'default' | 'sm' | 'md' | 'lg' | 'xl';
}

const sizeClasses = {
  default: 'text-xl leading-[23px] font-semibold',
  sm: 'text-lg leading-[43px] font-bold',
  md: 'text-[16px] text-[16px] lg:text-[32px] lg:leading-[32px] font-bold',
  lg: 'text-[44px] leading-[44px] font-bold',
  xl: 'text-[34px] leading-[36px] lg:text-[54px] lg:leading-[66px] font-semiBold',
};

export const Heading = ({
  as: Comp = 'h2',
  size = 'default',
  className,
  children,
  ...props
}: HeadingProps) => {
  return (
    <Comp className={cn(sizeClasses[size], className)} {...props}>
      {children}
    </Comp>
  );
};
