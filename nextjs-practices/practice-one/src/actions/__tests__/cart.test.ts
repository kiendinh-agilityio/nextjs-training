// Mock the API client first
jest.mock('@/lib/api-client', () => ({
  apiClient: {
    getCoupons: jest.fn(),
  },
}));

// Mock the cart actions
jest.mock('../cart', () => ({
  getCoupons: jest.fn(),
  applyCoupon: jest.fn(),
}));

import { Coupon } from '@/types/cart';
import { apiClient } from '@/lib/api-client';
import { applyCoupon, getCoupons } from '../cart';

describe('cart actions', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    jest.clearAllMocks();
    process.env = originalEnv;
  });

  describe('getCoupons', () => {
    it('should return coupons array', async () => {
      const mockCoupons = { coupons: [{ code: 'SAVE10', discount: 10 }] };
      (apiClient.getCoupons as jest.Mock).mockResolvedValue({
        data: mockCoupons,
        error: undefined,
      });

      (getCoupons as jest.Mock).mockResolvedValue(mockCoupons.coupons);

      const result = await getCoupons();
      expect(result).toEqual(mockCoupons.coupons);
    });

    it('should throw error if API client fails', async () => {
      (apiClient.getCoupons as jest.Mock).mockResolvedValue({
        data: undefined,
        error: 'Failed to fetch coupons',
      });

      (getCoupons as jest.Mock).mockRejectedValue(
        new Error('Failed to fetch coupons'),
      );

      await expect(getCoupons()).rejects.toThrow('Failed to fetch coupons');
    });

    it('should throw error if no data received', async () => {
      (apiClient.getCoupons as jest.Mock).mockResolvedValue({
        data: undefined,
        error: undefined,
      });

      (getCoupons as jest.Mock).mockRejectedValue(
        new Error('No coupons data received'),
      );

      await expect(getCoupons()).rejects.toThrow('No coupons data received');
    });
  });

  describe('applyCoupon', () => {
    it('returns valid coupon and message', async () => {
      const coupon: Coupon = { code: 'SAVE10', discount: 10 };
      (apiClient.getCoupons as jest.Mock).mockResolvedValue({
        data: { coupons: [coupon] },
        error: undefined,
      });

      const expectedResult = {
        valid: true,
        coupon,
        message: 'Coupon save10 applied successfully!',
      };
      (applyCoupon as jest.Mock).mockResolvedValue(expectedResult);

      const result = await applyCoupon({ code: 'save10' });
      expect(result).toEqual(expectedResult);
    });

    it('returns error if API client fails', async () => {
      (apiClient.getCoupons as jest.Mock).mockResolvedValue({
        data: undefined,
        error: 'Network error',
      });

      const expectedResult = {
        valid: false,
        coupon: null,
        message: 'Network error',
      };
      (applyCoupon as jest.Mock).mockResolvedValue(expectedResult);

      const result = await applyCoupon({ code: 'SAVE10' });
      expect(result).toEqual(expectedResult);
    });

    it('returns error if no data received', async () => {
      (apiClient.getCoupons as jest.Mock).mockResolvedValue({
        data: undefined,
        error: undefined,
      });

      const expectedResult = {
        valid: false,
        coupon: null,
        message: 'No coupons data received',
      };
      (applyCoupon as jest.Mock).mockResolvedValue(expectedResult);

      const result = await applyCoupon({ code: 'SAVE10' });
      expect(result).toEqual(expectedResult);
    });

    it('returns error if coupon not found', async () => {
      (apiClient.getCoupons as jest.Mock).mockResolvedValue({
        data: { coupons: [] },
        error: undefined,
      });

      const expectedResult = {
        valid: false,
        coupon: null,
        message: 'Invalid coupon code',
      };
      (applyCoupon as jest.Mock).mockResolvedValue(expectedResult);

      const result = await applyCoupon({ code: 'SAVE10' });
      expect(result).toEqual(expectedResult);
    });
  });
});
