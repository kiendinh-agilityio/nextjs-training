import { useActionState } from 'react';
import { cartAction } from '@/actions/cart';
import { CartState } from '@/types/cart';

const initialState: CartState = {
  items: [],
  subTotal: 0,
  discount: 0,
  total: 0,
};

export const useCartAction = () => {
  const [, formAction, isPending] = useActionState(cartAction, initialState);

  return { formAction, isPending };
};
