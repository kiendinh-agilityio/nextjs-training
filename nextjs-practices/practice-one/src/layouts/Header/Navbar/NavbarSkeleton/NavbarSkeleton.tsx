import Link from 'next/link';
import type { Session } from 'next-auth';

// import types
import type { UserProfile } from '@/stores/useUserStore';

// import components
import { UserIcon } from '@/components/Icons/UserIcon';
import UserDropdown from '@/components/UserDropdown/UserDropdown';

// import lib
import { cn } from '@/lib/utils';

// import constants
import { ROUTERS } from '@/constants/router';

export const NavbarSkeletonDesktop = ({
  status,
  session,
  profile,
}: {
  status: string;
  session: Session | null;
  profile: UserProfile | null;
}) => {
  if (status === 'loading') {
    return (
      <div className="flex hidden w-[202px] items-center gap-2 rounded-full bg-secondary px-[25px] py-[17px] font-medium text-white lg:flex lg:justify-center">
        <span
          data-testid="desktop-skeleton"
          className="h-7 w-7 animate-pulse rounded-full bg-gray-200"
        />
        <span className="h-6 w-28 animate-pulse rounded bg-gray-200" />
      </div>
    );
  }

  if (session?.user?.email && profile) {
    return (
      <div className="mt-2 hidden lg:block">
        <UserDropdown />
      </div>
    );
  }

  return (
    <Link
      href={ROUTERS.LOGIN}
      className="flex hidden w-[202px] items-center gap-2 rounded-full bg-secondary px-[25px] py-[17px] font-medium text-white transition-colors hover:bg-navy-900 lg:flex lg:justify-center"
      aria-label="Login Page"
    >
      <UserIcon />
      Login Page
    </Link>
  );
};

export const NavbarSkeletonMobile = ({
  status,
  session,
  profile,
  onLinkClick,
}: {
  status: string;
  session: Session | null;
  profile: UserProfile | null;
  onLinkClick: () => void;
}) => {
  if (status === 'loading') {
    return (
      <div
        className={cn(
          'flex items-center justify-center transition-colors',
          'mt-2 w-full gap-2 px-[25px] py-[17px]',
          'rounded-full bg-secondary font-medium text-white',
        )}
      >
        <span
          data-testid="mobile-skeleton"
          className="h-8 w-8 animate-pulse rounded-full bg-gray-200"
        />
        <span className="h-6 w-24 animate-pulse rounded bg-gray-200" />
      </div>
    );
  }

  if (session?.user?.email && profile) {
    return (
      <div className="mt-2">
        <UserDropdown />
      </div>
    );
  }

  return (
    <Link
      href={ROUTERS.LOGIN}
      className={cn(
        'flex items-center justify-center transition-colors',
        'mt-2 w-full gap-2 px-[25px] py-[17px]',
        'rounded-full bg-secondary font-medium text-white hover:bg-navy-900',
      )}
      aria-label="Login Page"
      onClick={onLinkClick}
    >
      <UserIcon />
      Login Page
    </Link>
  );
};
