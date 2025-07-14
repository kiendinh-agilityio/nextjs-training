import { use, Suspense } from 'react';
import {
  HeroSection,
  RestaurantHeaderSection,
  CategorySection,
  ContactSection,
  RestaurantListSection,
} from '@/components/Restaurants';
import { createMetadata } from '@/utils/metadata';
import { BASE_URL } from '@/constants/url';
import { ROUTERS } from '@/constants/router';

export const metadata = createMetadata({
  title: 'Restaurants Page',
  description:
    'Discover the best restaurant, exclusive deals, and top-rated meals on Order.uk. Browse, order, and enjoy your favorite dishes delivered fast.',
  keywords: ['restaurant', 'products', 'Order.uk', 'deals'],
  url: `${BASE_URL}${ROUTERS.RESTAURANT}`,
  imageAlt: 'Order.uk Restaurant',
});

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
