import { CartItem } from '@/types/cart';

export const calculateCartCount = (items: CartItem[]): number =>
  items.reduce((sum, item) => sum + item.quantity, 0);

export const calculateTotalPrice = (
  items: CartItem[],
  discount = 0,
): number => {
  const subtotal = items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0,
  );

  return subtotal - discount;
};
