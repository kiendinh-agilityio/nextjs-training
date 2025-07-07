import { use } from 'react';
import {
  HeroSection,
  RestaurantHeaderSection,
  CategorySection,
  ContactSection,
  RestaurantListSection,
} from '@/components/Restaurants';

// Accept searchParams as a Promise in Next.js 15
interface RestaurantPageProps {
  searchParams: Promise<{ category?: string }>;
}

const RestaurantPage = ({ searchParams }: RestaurantPageProps) => {
  // Unwrap the searchParams promise using React 19 use() hook
  const { category } = use(searchParams);

  return (
    <>
      <HeroSection />
      <RestaurantHeaderSection />
      <CategorySection />
      {/* Pass category from searchParams to RestaurantListSection */}
      <RestaurantListSection category={category} />
      <ContactSection />
    </>
  );
};

export default RestaurantPage;
