'use server';

import { PRODUCT_API_URL } from '@/constants/api-endpoint';
import { Product } from '@/types/product';

export const getRestaurantList = async (
  category?: string,
): Promise<Product[]> => {
  let url = PRODUCT_API_URL ?? '';

  if (category) {
    url += `?category=${encodeURIComponent(category)}`;
  }

  const response = await fetch(url, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch foods');
  }

  return response.json();
};

export const getProductDetail = async (
  id: string | number,
): Promise<Product> => {
  const url = `${PRODUCT_API_URL}/${id}`;

  const response = await fetch(url, { cache: 'no-store' });

  if (!response.ok) {
    throw new Error('Failed to fetch product detail');
  }

  return response.json();
};
