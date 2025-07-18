jest.unmock('../cart');

// Fix: Use import instead of require for modules
import { cartAction, getCartStateAction, applyCoupon } from '../cart';
import type { CartState, CartActionPayload, Coupon } from '@/types/cart';
import { revalidatePath } from 'next/cache';

// Mock revalidatePath from next/cache
jest.mock('next/cache', () => ({
  revalidatePath: jest.fn(),
}));

const initialState: CartState = {
  items: [],
  subTotal: 0,
  discount: 0,
  total: 0,
};

describe('cartAction', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('calls revalidatePath and returns prevState', async () => {
    const prevState: CartState = { ...initialState, subTotal: 100 };
    const action: CartActionPayload = {
      type: 'add',
      payload: { id: '1', name: 'A', price: 10 },
    };
    const result = await cartAction(prevState, action);
    expect(revalidatePath).toHaveBeenCalledWith('/cart');
    expect(revalidatePath).toHaveBeenCalledWith('/');
    expect(result).toBe(prevState);
  });

  it('throws error if revalidatePath throws', async () => {
    (revalidatePath as jest.Mock).mockImplementationOnce(() => {
      throw new Error('fail');
    });
    const prevState: CartState = { ...initialState };
    const action: CartActionPayload = { type: 'remove', payload: '1' };
    await expect(cartAction(prevState, action)).rejects.toThrow(
      'Failed to update cart: fail',
    );
  });
});

describe('getCartStateAction', () => {
  it('returns initial cart state', async () => {
    const result = await getCartStateAction();
    expect(result).toEqual(initialState);
  });
});

describe('applyCoupon', () => {
  const originalEnv = process.env;
  // Use NodeJS.Global & { fetch: jest.Mock } for type safety
  type GlobalWithFetch = typeof globalThis & { fetch: jest.Mock };
  let globalWithFetch: GlobalWithFetch;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
    globalWithFetch = global as GlobalWithFetch;
  });

  afterEach(() => {
    jest.clearAllMocks();
    process.env = originalEnv;
  });

  const mockFetch = (
    response: Partial<Response> & { json: () => Promise<unknown> },
  ) => {
    globalWithFetch.fetch = jest.fn().mockResolvedValue(response);
  };

  it('returns error if fetch fails', async () => {
    globalWithFetch.fetch = jest
      .fn()
      .mockRejectedValue(new Error('Network error'));
    await expect(
      applyCoupon({ code: 'SAVE10', subTotal: 100 }),
    ).rejects.toThrow('Network error');
  });

  it('returns error if response is not ok', async () => {
    mockFetch({ ok: false, json: async () => ({}) });
    const result = await applyCoupon({ code: 'SAVE10', subTotal: 100 });
    expect(result).toEqual({
      valid: false,
      discount: 0,
      percent: 0,
      message: 'Failed to fetch coupons: undefined',
    });
  });

  it('returns error if coupon not found', async () => {
    mockFetch({ ok: true, json: async () => ({ coupons: [] }) });
    const result = await applyCoupon({ code: 'SAVE10', subTotal: 100 });
    expect(result).toEqual({
      valid: false,
      discount: 0,
      percent: 0,
      message: 'Invalid coupon code',
    });
  });

  it('returns valid coupon and discount', async () => {
    const coupon: Coupon = { code: 'SAVE10', discount: 10 };
    mockFetch({ ok: true, json: async () => ({ coupons: [coupon] }) });
    const result = await applyCoupon({ code: 'save10', subTotal: 200 });
    expect(result).toEqual({
      valid: true,
      discount: 20,
      percent: 10,
      message: 'Coupon save10 applied successfully!',
    });
  });

  it('uses NEXT_PUBLIC_BASE_URL if window is undefined', async () => {
    // Simulate server-side
    delete (globalWithFetch as Partial<GlobalWithFetch>).window;
    process.env.NEXT_PUBLIC_BASE_URL = 'http://test-url';
    const coupon: Coupon = { code: 'SERVER', discount: 15 };
    mockFetch({ ok: true, json: async () => ({ coupons: [coupon] }) });
    const result = await applyCoupon({ code: 'server', subTotal: 100 });
    const fetchMock = globalWithFetch.fetch as jest.Mock;
    const calledUrl = fetchMock.mock.calls[0][0];
    expect(calledUrl.endsWith('/api/coupons')).toBe(true);
    expect(calledUrl.startsWith('http://test-url')).toBe(true);
    expect(result.valid).toBe(true);
    expect(result.discount).toBe(15);
  });
});
