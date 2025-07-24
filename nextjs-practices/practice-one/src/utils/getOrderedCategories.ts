import { Product } from '@/types/product';

export const getOrderedCategories = (
  categories: [string, Product[]][],
  categoryOrder: string[],
  excludeCategory = 'Offers',
): [string, Product[]][] => {
  return categoryOrder
    .filter((cat) => cat !== excludeCategory)
    .map(
      (cat) =>
        [cat, categories.find(([c]) => c === cat)?.[1] || []] as [
          string,
          Product[],
        ],
    );
};
