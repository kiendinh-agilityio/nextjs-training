'use server';

import { revalidatePath } from 'next/cache';
import { CartActionPayload } from '@/types/cart';

export const cartAction = async (_action: CartActionPayload) => {
  revalidatePath('/cart');

  return { success: true };
};
