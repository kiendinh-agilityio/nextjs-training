import {
  isLinkActive,
  getLinkClasses,
  getMobileLinkClasses,
} from '../navigation';

describe('Navigation Utils', () => {
  describe('isLinkActive', () => {
    it('should return true when link href matches current pathname', () => {
      expect(isLinkActive('/home', '/home')).toBe(true);
      expect(isLinkActive('/about', '/about')).toBe(true);
    });

    it('should return false when link href does not match current pathname', () => {
      expect(isLinkActive('/home', '/about')).toBe(false);
      expect(isLinkActive('/about', '/home')).toBe(false);
    });

    it('should return true for restaurant link when on restaurant pages', () => {
      expect(isLinkActive('/restaurant', '/restaurant')).toBe(true);
      expect(isLinkActive('/restaurant', '/restaurant/123')).toBe(true);
      expect(isLinkActive('/restaurant', '/product-detail/456')).toBe(true);
    });

    it('should return false for restaurant link when on other pages', () => {
      expect(isLinkActive('/restaurant', '/home')).toBe(false);
      expect(isLinkActive('/restaurant', '/about')).toBe(false);
    });
  });

  describe('getLinkClasses', () => {
    const currentPathname = '/home';

    it('should return active classes for active link', () => {
      const result = getLinkClasses('/home', currentPathname);
      expect(result).toBe(
        'rounded-full bg-primary px-6 py-2 font-medium text-white shadow',
      );
    });

    it('should return inactive classes for inactive link', () => {
      const result = getLinkClasses('/about', currentPathname);
      expect(result).toBe('px-3 py-2 font-medium text-black');
    });

    it('should return disabled classes for disabled link', () => {
      const result = getLinkClasses('/disabled', currentPathname, true);
      expect(result).toBe(
        'cursor-not-allowed select-none px-3 py-2 font-medium text-black opacity-60',
      );
    });

    it('should return active disabled classes for active disabled link', () => {
      const result = getLinkClasses('/home', currentPathname, true);
      expect(result).toBe(
        'cursor-not-allowed select-none px-3 py-2 font-medium text-black opacity-60 rounded-full bg-primary font-semibold text-white shadow',
      );
    });
  });

  describe('getMobileLinkClasses', () => {
    const currentPathname = '/home';

    it('should return active mobile classes for active link', () => {
      const result = getMobileLinkClasses('/home', currentPathname);
      expect(result).toBe(
        'block rounded-full bg-primary px-6 py-2 font-semibold text-white shadow',
      );
    });

    it('should return inactive mobile classes for inactive link', () => {
      const result = getMobileLinkClasses('/about', currentPathname);
      expect(result).toBe('block px-3 py-2 font-medium text-black');
    });

    it('should return disabled mobile classes for disabled link', () => {
      const result = getMobileLinkClasses('/disabled', currentPathname, true);
      expect(result).toBe(
        'block cursor-not-allowed select-none px-3 py-2 font-medium text-black opacity-60',
      );
    });

    it('should return active disabled mobile classes for active disabled link', () => {
      const result = getMobileLinkClasses('/home', currentPathname, true);
      expect(result).toBe(
        'block cursor-not-allowed select-none px-3 py-2 font-medium text-black opacity-60 rounded-full bg-primary font-semibold text-white shadow',
      );
    });
  });
});
