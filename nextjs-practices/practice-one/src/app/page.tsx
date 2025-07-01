import {
  HeroSection,
  PromotionsSection,
  PopularCategoriesSection,
  PopularRestaurantsSection,
} from '@/components/Home';

const Homepage = () => {
  return (
    <main className="container mx-auto lg:px-0">
      <HeroSection />
      <PromotionsSection />
      <PopularCategoriesSection />
      <PopularRestaurantsSection />
    </main>
  );
};

export default Homepage;
