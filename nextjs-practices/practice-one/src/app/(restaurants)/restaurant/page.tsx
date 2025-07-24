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
import CategorySkeletonSection from '@/components/ProductSkeleton/CategorySkeleton';

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
      <Suspense
        fallback={
          <section className="container mx-auto flex flex-col gap-32 sm:px-0">
            <CategorySkeletonSection count={6} />
            <CategorySkeletonSection count={6} />
            <CategorySkeletonSection count={6} />
          </section>
        }
      >
        <RestaurantListSection category={category} />
      </Suspense>
      <ContactSection />
    </>
  );
};

export default RestaurantPage;
