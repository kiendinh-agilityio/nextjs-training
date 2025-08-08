'use client';

// import react hooks
import { useState } from 'react';

// import nextjs components and hooks
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';

// import components
import { Logo } from '@/components/common/ui/logo';
import {
  NavbarSkeletonMobile,
  NavbarSkeletonDesktop,
} from './NavbarSkeleton/NavbarSkeleton';
import { NavLinksDesktop, NavLinksMobile } from './NavLinks/NavLinks';

// import lib
import { cn } from '@/lib/utils';

// import hooks
import { useUserProfile } from '@/hooks/useUserProfile';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const { profile } = useUserProfile();

  const handleToggleMenu = () => setOpen((v) => !v);
  const handleCloseMenu = () => setOpen(false);

  return (
    <div className="flex w-full items-center justify-end gap-4 md:gap-8">
      {/* Desktop Nav */}
      <div className="flex lg:gap-[24px] xl:gap-[53px]">
        <nav
          data-testid="desktop-nav"
          className="flex hidden items-center justify-center gap-4 lg:flex lg:text-[18px] lg:font-medium lg:text-black xl:gap-8"
        >
          <NavLinksDesktop pathname={pathname} />
        </nav>

        {/* Desktop Login/Signup */}
        <NavbarSkeletonDesktop
          status={status}
          session={session}
          profile={profile}
        />
      </div>

      {/* Mobile Hamburger */}
      <button
        className="ml-auto lg:hidden"
        aria-label="Toggle menu"
        onClick={handleToggleMenu}
      >
        <svg
          width="32"
          height="32"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Mobile Nav Overlay */}
      {open && (
        <button
          className="fixed inset-0 z-40 bg-black bg-opacity-40 lg:hidden"
          onClick={handleCloseMenu}
        />
      )}

      {/* Mobile Nav */}
      <nav
        data-testid="mobile-nav"
        className={cn(
          'fixed right-0 top-0 z-50 h-full w-64 bg-white shadow-lg',
          'transform transition-transform duration-200',
          'lg:hidden',
          open ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <div className="flex items-center justify-between border-b p-4">
          <Logo href="/" src="/images/logo.svg" />
          <button aria-label="Close menu" onClick={handleCloseMenu}>
            <svg
              width="28"
              height="28"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <ul className="flex flex-col gap-2 p-4">
          <NavLinksMobile pathname={pathname} onLinkClick={handleCloseMenu} />
          <li>
            <NavbarSkeletonMobile
              status={status}
              session={session}
              profile={profile}
              onLinkClick={handleCloseMenu}
            />
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
