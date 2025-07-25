import { Product } from '@/types/product';
import { getRestaurantList } from '@/actions/product';
import { groupProductsByCategory } from '@/utils/groupProductsByCategory';
import { getOrderedCategories } from '@/utils/getOrderedCategories';
import { CATEGORIES_ITEM } from '@/constants/restaurants-data';

export const fetchGroupedRestaurantCategories = async (
  category?: string,
): Promise<[string, Product[]][]> => {
  const data: Product[] = await getRestaurantList(
    !category || category === 'Offers' ? undefined : category,
  );

  const grouped = groupProductsByCategory(data);

  return getOrderedCategories(grouped, CATEGORIES_ITEM);
};
