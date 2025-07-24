import { Product } from '@/types/product';

export const groupProductsByCategory = (
  products: Product[],
): [string, Product[]][] => {
  const categoryMap = products.reduce((map: Map<string, Product[]>, item) => {
    if (!map.has(item.category)) {
      map.set(item.category, []);
    }
    map.get(item.category)!.push(item);
    return map;
  }, new Map<string, Product[]>());

  return Array.from(categoryMap);
};
