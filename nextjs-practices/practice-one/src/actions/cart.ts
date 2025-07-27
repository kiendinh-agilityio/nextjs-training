'use server';

import { revalidatePath } from 'next/cache';
import { CartActionPayload, CartState, Coupon } from '@/types/cart';

const initialState: CartState = {
  items: [],
  subTotal: 0,
  discount: 0,
  total: 0,
};

export const cartAction = async (
  prevState: CartState,
  _action: CartActionPayload,
): Promise<CartState> => {
  try {
    revalidatePath('/cart');
    revalidatePath('/');

    return prevState;
  } catch (error) {
    throw new Error('Failed to update cart: ' + (error as Error).message);
  }
};

// Server action to get cart state from client
export const getCartStateAction = async (): Promise<CartState> => initialState;

export const getCoupons = async (): Promise<Coupon[]> => {
  let baseUrl = '';
  if (typeof window === 'undefined') {
    baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ||
      (process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : 'http://localhost:3000');
  }
  const res = await fetch(`${baseUrl}/api/coupons`, { cache: 'no-store' });

  if (!res.ok) throw new Error('Failed to fetch coupons');
  const db = await res.json();

  return db.coupons;
};

export const applyCoupon = async ({ code }: { code: string }) => {
  let baseUrl = '';
  if (typeof window === 'undefined') {
    baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ||
      (process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : 'http://localhost:3000');
  }
  const res = await fetch(`${baseUrl}/api/coupons`, { cache: 'no-store' });

  if (!res.ok) {
    return {
      valid: false,
      coupon: null,
      message: `Failed to fetch coupons: ${res.status}`,
    };
  }

  const db = await res.json();
  const coupon: Coupon | undefined = db.coupons.find(
    (c: Coupon) => c.code === code.toUpperCase(),
  );

  if (!coupon) {
    return {
      valid: false,
      coupon: null,
      message: 'Invalid coupon code',
    };
  }

  return {
    valid: true,
    coupon,
    message: `Coupon ${code} applied successfully!`,
  };
};
