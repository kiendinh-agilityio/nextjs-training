import * as React from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';

export interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  href: string;
}

export const Logo = ({
  src,
  alt = 'Logo',
  href,
  className,
  children,
  ...props
}: LogoProps) => {
  const content = src ? (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 767px) 154px, 215px"
      className="object-contain"
      priority
    />
  ) : (
    children
  );

  const logoBox = (
    <div
      className={cn(
        'relative w-[154px] h-[38px] md:w-[215px] md:h-[53px]',
        className,
      )}
      {...props}
    >
      {content}
    </div>
  );

  return href ? (
    <Link href={href} aria-label="Home" tabIndex={0} className="inline-block">
      {logoBox}
    </Link>
  ) : (
    logoBox
  );
};
