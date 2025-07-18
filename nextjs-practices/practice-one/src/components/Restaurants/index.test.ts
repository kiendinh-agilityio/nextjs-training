import {
  HeroSection,
  CategorySection,
  ContactSection,
  RestaurantHeaderSection,
  RestaurantListSection,
} from './index';

describe('Restaurant index exports', () => {
  it('should export HeroSection', () => {
    expect(HeroSection).toBeDefined();
  });

  it('should export CategorySection', () => {
    expect(CategorySection).toBeDefined();
  });

  it('should export ContactSection', () => {
    expect(ContactSection).toBeDefined();
  });

  it('should export RestaurantHeaderSection', () => {
    expect(RestaurantHeaderSection).toBeDefined();
  });
  it('should export RestaurantListSection', () => {
    expect(RestaurantListSection).toBeDefined();
  });
});
