'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

import { Logo } from '@/components/common/ui/logo';
import { UserIcon } from '@/components/Icons/UserIcon';
import { NAV_LINKS } from '@/constants/nav-links';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const handleToggleMenu = () => setOpen((v) => !v);
  const handleCloseMenu = () => setOpen(false);

  const getButtonLabel = () =>
    session?.user?.email ? 'Profile/Logout' : 'Login Page';

  return (
    <div className="flex w-full items-center justify-end gap-4 md:gap-8">
      {/* Desktop Nav */}
      <div className="flex lg:gap-[24px] xl:gap-[53px]">
        <nav
          data-testid="desktop-nav"
          className="flex hidden items-center justify-center gap-4 lg:flex lg:text-[18px] lg:font-medium lg:text-black xl:gap-8"
        >
          {NAV_LINKS.map((link) =>
            link.disabled ? (
              <Link
                href="#"
                key={link.label}
                className={
                  'cursor-not-allowed select-none px-3 py-2 font-medium text-black opacity-60' +
                  (pathname === link.href ||
                  (link.href === '/restaurant' &&
                    (pathname.startsWith('/restaurant') ||
                      pathname.startsWith('/product-detail')))
                    ? ' rounded-full bg-primary font-semibold text-white shadow'
                    : '')
                }
              >
                {link.label}
              </Link>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={
                  pathname === link.href ||
                  (link.href === '/restaurant' &&
                    (pathname.startsWith('/restaurant') ||
                      pathname.startsWith('/product-detail')))
                    ? 'rounded-full bg-primary px-6 py-2 font-medium text-white shadow'
                    : 'px-3 py-2 font-medium text-black'
                }
              >
                {link.label}
              </Link>
            ),
          )}
        </nav>

        {/* Desktop Login/Signup */}
        <Link
          href={session?.user?.email ? '/profile' : '/login'}
          className="flex hidden w-[202px] items-center gap-2 rounded-full bg-secondary px-[25px] py-[17px] font-medium text-white transition-colors hover:bg-[#1a1f33] lg:flex lg:justify-center"
          aria-label={getButtonLabel()}
        >
          {status === 'loading' ? (
            <>
              <span
                data-testid="desktop-skeleton"
                className="h-7 w-7 animate-pulse rounded-full bg-gray-200"
              />
              <span className="h-6 w-28 animate-pulse rounded bg-gray-200" />
            </>
          ) : (
            <>
              <UserIcon />
              {getButtonLabel()}
            </>
          )}
        </Link>
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
          {NAV_LINKS.map((link) => (
            <li key={link.href || link.label}>
              {link.disabled ? (
                <span
                  className={
                    'block cursor-not-allowed select-none px-3 py-2 font-medium text-black opacity-60' +
                    (pathname === link.href ||
                    (link.href === '/restaurant' &&
                      (pathname.startsWith('/restaurant') ||
                        pathname.startsWith('/product-detail')))
                      ? ' rounded-full bg-primary font-semibold text-white shadow'
                      : '')
                  }
                >
                  {link.label}
                </span>
              ) : (
                <Link
                  href={link.href}
                  className={
                    pathname === link.href ||
                    (link.href === '/restaurant' &&
                      (pathname.startsWith('/restaurant') ||
                        pathname.startsWith('/product-detail')))
                      ? 'block rounded-full bg-primary px-6 py-2 font-semibold text-white shadow'
                      : 'block px-3 py-2 font-medium text-black'
                  }
                  onClick={handleCloseMenu}
                >
                  {link.label}
                </Link>
              )}
            </li>
          ))}
          <li>
            <Link
              href={session?.user?.email ? '/profile' : '/login'}
              className={cn(
                'flex items-center justify-center transition-colors',
                'mt-2 w-full gap-2 px-[25px] py-[17px]',
                'rounded-full bg-secondary font-medium text-white hover:bg-[#1a1f33]',
              )}
              aria-label={getButtonLabel()}
              onClick={handleCloseMenu}
            >
              {status === 'loading' ? (
                <>
                  <span
                    data-testid="mobile-skeleton"
                    className="h-8 w-8 animate-pulse rounded-full bg-gray-200"
                  />
                  <span className="h-6 w-24 animate-pulse rounded bg-gray-200" />
                </>
              ) : (
                <>
                  <UserIcon />
                  {getButtonLabel()}
                </>
              )}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
