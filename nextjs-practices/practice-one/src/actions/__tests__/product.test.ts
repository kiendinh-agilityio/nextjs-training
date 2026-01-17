// Mock the API client first
jest.mock('@/lib/api-client', () => ({
  apiClient: {
    getProducts: jest.fn(),
    getProduct: jest.fn(),
  },
}));

import type { Product } from '@/types/product';
import { apiClient } from '@/lib/api-client';
import { getRestaurantList, getProductDetail } from '../product';
import { PRODUCTS_DATA } from '@/mocks/products';

const OLD_ENV = process.env;

describe('product actions', () => {
  const mockProducts: Product[] = PRODUCTS_DATA;
  const mockProduct: Product = mockProducts[0];

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
    jest.clearAllMocks();
  });

  afterAll(() => {
    process.env = OLD_ENV;
    jest.resetModules();
    jest.clearAllMocks();
  });

  describe('getRestaurantList', () => {
    it('fetches products without category', async () => {
      (apiClient.getProducts as jest.Mock).mockResolvedValue({
        data: mockProducts,
        error: undefined,
      });

      const result = await getRestaurantList();

      expect(apiClient.getProducts).toHaveBeenCalledWith(undefined);
      expect(result).toEqual(mockProducts);
    });

    it('fetches products with category', async () => {
      (apiClient.getProducts as jest.Mock).mockResolvedValue({
        data: mockProducts,
        error: undefined,
      });

      const category = 'Italian';
      const result = await getRestaurantList(category);

      expect(apiClient.getProducts).toHaveBeenCalledWith(category);
      expect(result).toEqual(mockProducts);
    });

    it('throws error if fetch fails', async () => {
      (apiClient.getProducts as jest.Mock).mockResolvedValue({
        data: undefined,
        error: 'Failed to fetch foods',
      });

      await expect(getRestaurantList()).rejects.toThrow(
        'Failed to fetch foods',
      );
    });

    it('throws error if no data received', async () => {
      (apiClient.getProducts as jest.Mock).mockResolvedValue({
        data: undefined,
        error: undefined,
      });

      await expect(getRestaurantList()).rejects.toThrow('No data received');
    });
  });

  describe('getProductDetail', () => {
    it('fetches product detail by id', async () => {
      (apiClient.getProduct as jest.Mock).mockResolvedValue({
        data: mockProduct,
        error: undefined,
      });

      const result = await getProductDetail(mockProduct.id);

      expect(apiClient.getProduct).toHaveBeenCalledWith(mockProduct.id);
      expect(result).toEqual(mockProduct);
    });

    it('returns null if fetch fails', async () => {
      (apiClient.getProduct as jest.Mock).mockResolvedValue({
        data: undefined,
        error: 'Failed to fetch product detail',
      });

      const result = await getProductDetail(mockProduct.id);
      expect(result).toBeNull();
    });

    it('returns null if no data received', async () => {
      (apiClient.getProduct as jest.Mock).mockResolvedValue({
        data: undefined,
        error: undefined,
      });

      const result = await getProductDetail(mockProduct.id);
      expect(result).toBeNull();
    });
  });
});
