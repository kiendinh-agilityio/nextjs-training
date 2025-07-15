'use server';

import fs from 'fs/promises';
import path from 'path';
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
  const dbPath = path.join(process.cwd(), 'db.json');
  const db = JSON.parse(await fs.readFile(dbPath, 'utf-8'));
  const coupon: Coupon | undefined = db.coupons.find(
    (c: Coupon) => c.code === code.toUpperCase(),
  );

  if (!coupon) {
    return { valid: false, discount: 0, message: 'Invalid coupon code' };
  }

  // Calculate discount as percentage of subTotal (e.g., 15% or 20%)
  const discount = Math.round((subTotal * coupon.discount) / 100);

  return {
    valid: true,
    discount,
    message: `Coupon ${code} applied successfully!`,
  };
};
