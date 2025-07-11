import { use, Suspense } from 'react';
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
      <Suspense fallback={<div>Loading restaurants...</div>}>
        <RestaurantListSection category={category} />
      </Suspense>
      <ContactSection />
    </>
  );
};

export default RestaurantPage;
