'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

import { Logo } from '@/components/common/ui/logo';
import { UserIcon } from '@/components/Icons/UserIcon';
import { NAV_LINKS } from '@/constants/nav-links';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  const handleToggleMenu = () => setOpen((v) => !v);
  const handleCloseMenu = () => setOpen(false);

  return (
    <div className="flex w-full items-center justify-end gap-4 md:gap-8">
      {/* Desktop Nav */}
      <div className="flex lg:gap-[24px] xl:gap-[53px]">
        <nav
          data-testid="desktop-nav"
          className="hidden lg:font-medium lg:text-black lg:text-[18px] lg:flex items-center justify-center gap-4 xl:gap-8"
        >
          {NAV_LINKS.map((link) =>
            link.disabled ? (
              <Link
                href="#"
                key={link.label}
                className={
                  'text-black font-medium px-3 py-2 opacity-60 cursor-not-allowed select-none' +
                  (pathname === link.href
                    ? ' bg-primary text-white rounded-full font-semibold shadow'
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
                  pathname === link.href
                    ? 'bg-primary text-white rounded-full px-6 py-2 font-medium shadow'
                    : 'text-black font-medium px-3 py-2'
                }
              >
                {link.label}
              </Link>
            ),
          )}
        </nav>

        {/* Desktop Login/Signup */}
        <Link
          href={session && session.user?.email ? '/profile' : '/login'}
          className="hidden rounded-full px-[25px] py-[17px] font-medium gap-2 bg-secondary text-white hover:bg-[#1a1f33] lg:flex items-center transition-colors"
          aria-label="Login or Signup"
        >
          <UserIcon />
          <span className="ml-2">Login/Signup</span>
        </Link>
      </div>

      {/* Mobile Hamburger */}
      <button
        className="lg:hidden ml-auto"
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
          className="lg:hidden fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={handleCloseMenu}
        />
      )}

      {/* Mobile Nav */}
      <nav
        data-testid="mobile-nav"
        className={`lg:hidden fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-200 ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between p-4 border-b">
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
                    'block text-black font-medium px-3 py-2 opacity-60 cursor-not-allowed select-none' +
                    (pathname === link.href
                      ? ' bg-orange-500 text-white rounded-full font-semibold shadow'
                      : '')
                  }
                >
                  {link.label}
                </span>
              ) : (
                <Link
                  href={link.href}
                  className={
                    pathname === link.href
                      ? 'block bg-orange-500 text-white rounded-full px-6 py-2 font-semibold shadow'
                      : 'block text-black font-medium px-3 py-2'
                  }
                  onClick={handleCloseMenu}
                >
                  {link.label}
                </Link>
              )}
            </li>
          ))}
          <Link
            href={session && session.user?.email ? '/profile' : '/login'}
            className="rounded-full px-[25px] py-[17px] font-medium gap-2 bg-secondary text-white hover:bg-[#1a1f33] w-full flex items-center justify-center transition-colors mt-2"
            aria-label="Login or Signup"
            onClick={handleCloseMenu}
          >
            <UserIcon />
            <span className="ml-2">Login/Signup</span>
          </Link>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
