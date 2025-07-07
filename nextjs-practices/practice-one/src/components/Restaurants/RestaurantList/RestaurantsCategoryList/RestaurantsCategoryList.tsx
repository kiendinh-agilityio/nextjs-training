'use client';

import { useEffect, useState } from 'react';

import { getRestaurantList } from '@/actions/product';
import { Heading } from '@/components/common/ui/heading';
import { Product } from '@/types/product';
import { cn } from '@/lib/utils';

import RestaurantsCard from '../RestaurantsCard/RestaurantsCard';
import CategorySkeletonSection from '@/components/ProductSkeleton/CategorySkeleton';

interface RestaurantsCategorySectionProps {
  category: string;
}

const RestaurantsCategoryList = ({
  category,
}: RestaurantsCategorySectionProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    getRestaurantList(category)
      .then((data) => setProducts(data))

      .finally(() => setLoading(false));
  }, [category]);

  return (
    <div>
      {loading ? (
        <CategorySkeletonSection count={6} />
      ) : (
        <>
          <Heading size="lg" className={cn('text-primary mb-[40px]')}>
            {category}
          </Heading>
          <div
            className={cn(
              'grid grid-cols-1 gap-[20px] lg:grid-cols-2 2xl:grid-cols-3',
            )}
          >
            {products.slice(0, 6).map((product) => (
              <RestaurantsCard key={product.name + product.id} {...product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default RestaurantsCategoryList;
