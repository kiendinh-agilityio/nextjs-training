'use server';

import { revalidatePath } from 'next/cache';
import { CartActionPayload, CartState, Coupon } from '@/types/cart';
import { apiClient } from '@/lib/api-client';

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
  const response = await apiClient.getCoupons();

  if (response.error) {
    throw new Error(response.error);
  }

  if (!response.data) {
    throw new Error('No coupons data received');
  }

  return response.data.coupons;
};

export const applyCoupon = async ({ code }: { code: string }) => {
  const response = await apiClient.getCoupons();

  if (response.error) {
    return {
      valid: false,
      coupon: null,
      message: response.error,
    };
  }

  if (!response.data) {
    return {
      valid: false,
      coupon: null,
      message: 'No coupons data received',
    };
  }

  const coupon: Coupon | undefined = response.data.coupons.find(
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
