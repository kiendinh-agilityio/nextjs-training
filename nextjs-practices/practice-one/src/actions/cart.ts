'use server';

import { revalidatePath } from 'next/cache';
import { CartActionPayload, CartState, Coupon } from '@/types/cart';

interface ApplyCouponProps {
  code: string;
  subTotal: number;
}

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

export const applyCoupon = async ({ code, subTotal }: ApplyCouponProps) => {
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
    const text = await res.text();
    console.error('Failed to fetch coupons:', res.status, text);
    return {
      valid: false,
      discount: 0,
      percent: 0,
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
      discount: 0,
      percent: 0,
      message: 'Invalid coupon code',
    };
  }

  // Calculate discount as percentage of subTotal (e.g., 15% or 20%)
  const discount = Math.round((subTotal * coupon.discount) / 100);

  return {
    valid: true,
    discount,
    percent: coupon.discount,
    message: `Coupon ${code} applied successfully!`,
  };
};
