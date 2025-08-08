import Link from 'next/link';

// import utils
import { getLinkClasses, getMobileLinkClasses } from '@/utils/navigation';

// import constants
import { NAV_LINKS } from '@/constants/nav-links';

export const NavLinksDesktop = ({
  pathname,
  onLinkClick,
}: {
  pathname: string;
  onLinkClick?: () => void;
}) => {
  return (
    <>
      {NAV_LINKS.map((link) => {
        if (link.disabled) {
          return (
            <span
              key={link.label}
              className={getLinkClasses(link.href, pathname, true)}
            >
              {link.label}
            </span>
          );
        }

        return (
          <Link
            key={link.href}
            href={link.href}
            className={getLinkClasses(link.href, pathname)}
            onClick={onLinkClick}
          >
            {link.label}
          </Link>
        );
      })}
    </>
  );
};

export const NavLinksMobile = ({
  pathname,
  onLinkClick,
}: {
  pathname: string;
  onLinkClick: () => void;
}) => {
  return (
    <>
      {NAV_LINKS.map((link) => (
        <li key={link.href || link.label}>
          {link.disabled ? (
            <span className={getMobileLinkClasses(link.href, pathname, true)}>
              {link.label}
            </span>
          ) : (
            <Link
              href={link.href}
              className={getMobileLinkClasses(link.href, pathname)}
              onClick={onLinkClick}
            >
              {link.label}
            </Link>
          )}
        </li>
      ))}
    </>
  );
};
