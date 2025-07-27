'use server';

import { apiClient } from '@/lib/api-client';
import { Product } from '@/types/product';

export const getRestaurantList = async (
  category?: string,
): Promise<Product[]> => {
  const response = await apiClient.getProducts(category);

  if (response.error) {
    throw new Error(response.error);
  }

  if (!response.data) {
    throw new Error('No data received');
  }

  return response.data;
};

export const getProductDetail = async (
  id: string | number,
): Promise<Product> => {
  const response = await apiClient.getProduct(id);

  if (response.error) {
    throw new Error(response.error);
  }

  if (!response.data) {
    throw new Error('No data received');
  }

  return response.data;
};
