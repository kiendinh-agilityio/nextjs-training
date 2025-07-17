import {
  HeroSection,
  PromotionsSection,
  PopularCategoriesSection,
  PopularRestaurantsSection,
} from './index';

describe('Home index exports', () => {
  it('should export HeroSection', () => {
    expect(HeroSection).toBeDefined();
  });

  it('should export PromotionsSection', () => {
    expect(PromotionsSection).toBeDefined();
  });

  it('should export PopularCategoriesSection', () => {
    expect(PopularCategoriesSection).toBeDefined();
  });

  it('should export PopularRestaurantsSection', () => {
    expect(PopularRestaurantsSection).toBeDefined();
  });
});
