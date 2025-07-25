import { fetchGroupedRestaurantCategories } from '@/utils/services';
import RestaurantsGroup from './RestaurantsGroup/RestaurantsGroup';
import FilteredCategory from './FilteredCategory/FilteredCategory';

interface RestaurantListSectionProps {
  category?: string;
}

const RestaurantListSection = async ({
  category,
}: RestaurantListSectionProps) => {
  if (category) {
    const filtered = <FilteredCategory category={category} />;
    if (filtered) return filtered;
  }

  const categories = await fetchGroupedRestaurantCategories(category);
  return <RestaurantsGroup categories={categories} />;
};

export default RestaurantListSection;
