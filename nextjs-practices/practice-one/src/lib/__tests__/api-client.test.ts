// Mock the constants
jest.mock('@/constants/api-setup', () => ({
  API_BASE_URL: 'http://localhost:3000',
  API_ENDPOINTS: {
    COUPONS: '/api/coupons',
    PRODUCTS: '/api/products',
    AUTH: '/api/auth/[...nextauth]',
  },
  API_PARAMS: {
    CATEGORY: 'category',
    ID: 'id',
  },
  AUTH_API_URL: process.env.NEXT_PUBLIC_AUTH_API_URL,
  API_ERRORS: {
    AUTH_API_URL_NOT_CONFIGURED: 'Auth API URL not configured',
    NETWORK_ERROR: 'Network error',
  },
}));

import { ApiClient } from '../api-client';

const globalAny: typeof globalThis = global;

describe('ApiClient', () => {
  let apiClient: ApiClient;

  beforeEach(() => {
    apiClient = new ApiClient();
    globalAny.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getCoupons', () => {
    it('should fetch coupons successfully', async () => {
      const mockCoupons = { coupons: [{ code: 'SAVE10', discount: 10 }] };
      globalAny.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: async () => mockCoupons,
      });

      const result = await apiClient.getCoupons();

      expect(globalAny.fetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/coupons',
        expect.objectContaining({
          headers: { 'Content-Type': 'application/json' },
        }),
      );
      expect(result.data).toEqual(mockCoupons);
    });
  });

  describe('getCoupon', () => {
    it('should fetch coupon by code successfully', async () => {
      const mockCoupon = { coupon: { code: 'SAVE10', discount: 10 } };
      globalAny.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: async () => mockCoupon,
      });

      const result = await apiClient.getCoupon('SAVE10');

      expect(globalAny.fetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/coupons/SAVE10',
        expect.objectContaining({
          headers: { 'Content-Type': 'application/json' },
        }),
      );
      expect(result.data).toEqual(mockCoupon);
    });
  });

  describe('getProducts', () => {
    it('should fetch products without category', async () => {
      const mockProducts = [{ id: 1, name: 'Pizza' }];
      globalAny.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: async () => mockProducts,
      });

      const result = await apiClient.getProducts();

      expect(globalAny.fetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/products',
        expect.objectContaining({
          headers: { 'Content-Type': 'application/json' },
        }),
      );
      expect(result.data).toEqual(mockProducts);
    });

    it('should fetch products with category', async () => {
      const mockProducts = [{ id: 1, name: 'Pizza' }];
      globalAny.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: async () => mockProducts,
      });

      const result = await apiClient.getProducts('Italian');

      expect(globalAny.fetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/products?category=Italian',
        expect.objectContaining({
          headers: { 'Content-Type': 'application/json' },
        }),
      );
      expect(result.data).toEqual(mockProducts);
    });
  });

  describe('getProduct', () => {
    it('should fetch product by id', async () => {
      const mockProduct = { id: 1, name: 'Pizza' };
      globalAny.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: async () => mockProduct,
      });

      const result = await apiClient.getProduct(1);

      expect(globalAny.fetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/products/1',
        expect.objectContaining({
          headers: { 'Content-Type': 'application/json' },
        }),
      );
      expect(result.data).toEqual(mockProduct);
    });
  });

  describe('authenticate', () => {
    it('should authenticate user', async () => {
      const mockUser = { id: 1, email: 'test@example.com' };
      globalAny.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: async () => mockUser,
      });

      const credentials = { email: 'test@example.com', password: 'password' };
      const result = await apiClient.authenticate(credentials);

      expect(globalAny.fetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/auth/[...nextauth]',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { 'Content-Type': 'application/json' },
        }),
      );
      expect(result.data).toEqual(mockUser);
    });
  });

  describe('getProfile', () => {
    it('should fetch profile successfully', async () => {
      const mockUsers = [
        { id: 1, email: 'test@example.com', name: 'Test User' },
      ];
      globalAny.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: async () => mockUsers,
      });

      // Set the environment variable for this test
      const mockAuthUrl = 'https://683ff7ba5b39a8039a564c58.mockapi.io/login';
      process.env.NEXT_PUBLIC_AUTH_API_URL = mockAuthUrl;

      const result = await apiClient.getProfile('test@example.com');

      expect(globalAny.fetch).toHaveBeenCalledWith(
        `${mockAuthUrl}?email=test%40example.com`,
      );
      expect(result.data).toEqual(mockUsers);

      // Restore environment
      delete process.env.NEXT_PUBLIC_AUTH_API_URL;
    });

    it('should handle fetch error', async () => {
      globalAny.fetch = jest.fn().mockRejectedValue(new Error('Network error'));

      const originalEnv = process.env;
      process.env.NEXT_PUBLIC_AUTH_API_URL = 'http://api.example.com/users';

      const result = await apiClient.getProfile('test@example.com');

      expect(result.error).toBe('Network error');

      // Restore environment
      process.env = originalEnv;
    });
  });
});
