'use client';

import { useEffect, useState } from 'react';
import { Product } from '@/types/product';
import { getRestaurantList } from '@/actions/product';
import { cn } from '@/lib/utils';

import RestaurantsCategoryList from './RestaurantsCategoryList/RestaurantsCategoryList';
import CategorySkeletonSection from '@/components/ProductSkeleton/CategorySkeleton';

// Accept category as a prop
interface RestaurantListSectionProps {
  category?: string;
}

const RestaurantListSection = ({ category }: RestaurantListSectionProps) => {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    getRestaurantList(!category || category === 'Offers' ? undefined : category)
      .then((res) => setData(res))

      .finally(() => setLoading(false));
  }, [category]);

  if (loading) {
    return (
      <section className={cn('container mx-auto sm:px-0 flex flex-col gap-32')}>
        <CategorySkeletonSection count={6} />
      </section>
    );
  }

  // If a category is selected and not 'Offers', show only that category
  if (category && category !== 'Offers') {
    return (
      <section className={cn('container mx-auto sm:px-0 flex flex-col gap-32')}>
        <RestaurantsCategoryList key={category} category={category} />
      </section>
    );
  }

  // Otherwise, group products by category
  const categories: [string, Product[]][] = Array.from(
    data.reduce((map: Map<string, Product[]>, item) => {
      if (!map.has(item.category)) map.set(item.category, []);

      map.get(item.category)!.push(item);

      return map;
    }, new Map()),
  );

  return (
    <section className={cn('container mx-auto sm:px-0 flex flex-col gap-32')}>
      {categories.map(([category]) => (
        <RestaurantsCategoryList key={category} category={category} />
      ))}
    </section>
  );
};

export default RestaurantListSection;
