'use client';

import { useEffect, useState } from 'react';
import { getRestaurantList } from '@/actions/product';
import { Product } from '@/types/product';
import { CATEGORIES_ITEM } from '@/constants/restaurants-data';
import { getOrderedCategories } from '@/utils/getOrderedCategories';
import { groupProductsByCategory } from '@/utils/groupProductsByCategory';

import RestaurantsCategoryList from './RestaurantsCategoryList/RestaurantsCategoryList';
import CategorySkeletonSection from '@/components/ProductSkeleton/CategorySkeleton';
import LoadMore from '@/components/LoadMore/LoadMore';

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
      <section className="container mx-auto flex flex-col gap-32 sm:px-0">
        <CategorySkeletonSection count={6} />
        <CategorySkeletonSection count={6} />
        <CategorySkeletonSection count={6} />
      </section>
    );
  }

  // If a category is selected and not 'Offers', show only that category
  if (category && category !== 'Offers') {
    return (
      <section className="container mx-auto flex flex-col gap-32 sm:px-0">
        <RestaurantsCategoryList key={category} category={category} />
      </section>
    );
  }

  // Otherwise, group products by category
  const categories = groupProductsByCategory(data);

  const renderCategoryList = ([category]: [string, Product[]]) => (
    <RestaurantsCategoryList key={category} category={category} />
  );

  return (
    <section className="container mx-auto flex flex-col gap-32 sm:px-0">
      <LoadMore
        items={getOrderedCategories(categories, CATEGORIES_ITEM)}
        initialCount={3}
        step={3}
        renderItem={renderCategoryList}
        className="flex flex-col gap-32"
      />
    </section>
  );
};

export default RestaurantListSection;
