import { ROUTERS } from '@/constants/router';

/**
 * Check if a navigation link is currently active
 * @param linkHref - The href of the navigation link
 * @param currentPathname - The current pathname from usePathname()
 * @returns boolean - True if the link is active
 */
export const isLinkActive = (
  linkHref: string,
  currentPathname: string,
): boolean => {
  if (linkHref === ROUTERS.RESTAURANT) {
    return (
      currentPathname.startsWith(ROUTERS.RESTAURANT) ||
      currentPathname.startsWith(ROUTERS.PRODUCT_DETAIL)
    );
  }
  return currentPathname === linkHref;
};

/**
 * Get CSS classes for desktop navigation links
 * @param linkHref - The href of the navigation link
 * @param currentPathname - The current pathname from usePathname()
 * @param isDisabled - Whether the link is disabled
 * @returns string - CSS classes for the link
 */
export const getLinkClasses = (
  linkHref: string,
  currentPathname: string,
  isDisabled: boolean = false,
): string => {
  const isActive = isLinkActive(linkHref, currentPathname);

  if (isDisabled) {
    const baseClasses =
      'cursor-not-allowed select-none px-3 py-2 font-medium text-black opacity-60';
    return isActive
      ? `${baseClasses} rounded-full bg-primary font-semibold text-white shadow`
      : baseClasses;
  }

  return isActive
    ? 'rounded-full bg-primary px-6 py-2 font-medium text-white shadow'
    : 'px-3 py-2 font-medium text-black';
};

/**
 * Get CSS classes for mobile navigation links
 * @param linkHref - The href of the navigation link
 * @param currentPathname - The current pathname from usePathname()
 * @param isDisabled - Whether the link is disabled
 * @returns string - CSS classes for the link
 */
export const getMobileLinkClasses = (
  linkHref: string,
  currentPathname: string,
  isDisabled: boolean = false,
): string => {
  const isActive = isLinkActive(linkHref, currentPathname);

  if (isDisabled) {
    const baseClasses =
      'block cursor-not-allowed select-none px-3 py-2 font-medium text-black opacity-60';
    return isActive
      ? `${baseClasses} rounded-full bg-primary font-semibold text-white shadow`
      : baseClasses;
  }

  return isActive
    ? 'block rounded-full bg-primary px-6 py-2 font-semibold text-white shadow'
    : 'block px-3 py-2 font-medium text-black';
};
