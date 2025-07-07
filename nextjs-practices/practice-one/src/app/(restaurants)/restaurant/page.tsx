import { use } from 'react';
import {
  HeroSection,
  RestaurantHeaderSection,
  CategorySection,
  ContactSection,
  RestaurantListSection,
} from '@/components/Restaurants';

interface RestaurantPageProps {
  searchParams: Promise<{ category?: string }>;
}

const RestaurantPage = ({ searchParams }: RestaurantPageProps) => {
  const { category } = use(searchParams);

  return (
    <>
      <HeroSection />
      <RestaurantHeaderSection />
      <CategorySection />
      <RestaurantListSection category={category} />
      <ContactSection />
    </>
  );
};

export default RestaurantPage;
