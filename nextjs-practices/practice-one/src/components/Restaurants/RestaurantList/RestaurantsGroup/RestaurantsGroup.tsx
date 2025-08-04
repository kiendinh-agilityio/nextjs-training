'use client';

// import types
import { Product } from '@/types/product';

// import components
import LoadMore from '@/components/LoadMore/LoadMore';
import RestaurantsCategoryList from '../RestaurantsCategoryList/RestaurantsCategoryList';

interface RestaurantsGroupProps {
  categories: [string, Product[]][];
  category?: string;
}

const RestaurantsGroup = ({
  categories,
  category: _category,
}: RestaurantsGroupProps) => {
  const renderCategoryList = (
    [category]: [string, Product[]],
    _idx: number,
  ) => <RestaurantsCategoryList key={category} category={category} />;

  return (
    <section className="container mx-auto flex flex-col gap-32 sm:px-0">
      <LoadMore
        items={categories}
        initialCount={3}
        step={3}
        renderItem={renderCategoryList}
        className="flex flex-col gap-32"
      />
    </section>
  );
};

export default RestaurantsGroup;
