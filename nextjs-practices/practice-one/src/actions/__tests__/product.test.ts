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

const OLD_ENV = process.env;

describe('product actions', () => {
  const mockProducts: Product[] = [
    {
      id: 1,
      name: 'Pizza',
      description: 'Delicious pizza',
      price: '10.00',
      image: '/pizza.jpg',
      category: 'Italian',
      rating: '4.5',
      ingredients: ['cheese', 'tomato'],
    },
    {
      id: 2,
      name: 'Burger',
      description: 'Juicy burger',
      price: '8.00',
      image: '/burger.jpg',
      category: 'American',
    },
  ];
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

    it('throws error if fetch fails', async () => {
      (apiClient.getProduct as jest.Mock).mockResolvedValue({
        data: undefined,
        error: 'Failed to fetch product detail',
      });

      await expect(getProductDetail(mockProduct.id)).rejects.toThrow(
        'Failed to fetch product detail',
      );
    });

    it('throws error if no data received', async () => {
      (apiClient.getProduct as jest.Mock).mockResolvedValue({
        data: undefined,
        error: undefined,
      });

      await expect(getProductDetail(mockProduct.id)).rejects.toThrow(
        'No data received',
      );
    });
  });
});
