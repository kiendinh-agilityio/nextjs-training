'use server';

import { revalidatePath } from 'next/cache';
import { CartActionPayload, CartState } from '@/types/cart';

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
