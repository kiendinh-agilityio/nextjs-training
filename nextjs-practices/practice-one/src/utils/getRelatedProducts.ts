import { Product } from '@/types/product';

export const getRelatedProducts = (
  allProducts: Product[],
  currentProductId: string,
  limit = 4,
): Product[] =>
  allProducts.filter((p) => p.id !== currentProductId).slice(0, limit);
