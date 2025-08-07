import { calculateCartCount, calculateTotalPrice } from '../calculateCart';
import type { CartItem } from '@/types/cart';

describe('calculateCartCount', () => {
  it('returns 0 when items array is empty', () => {
    expect(calculateCartCount([])).toBe(0);
  });

  it('calculates the total quantity of items correctly', () => {
    const items: CartItem[] = [
      { id: '1', name: 'Item A', price: 10, quantity: 2 },
      { id: '2', name: 'Item B', price: 20, quantity: 3 },
      { id: '3', name: 'Item C', price: 15, quantity: 1 },
    ];

    expect(calculateCartCount(items)).toBe(6);
  });
});

describe('calculateTotalPrice', () => {
  it('returns 0 when items array is empty and no discount', () => {
    expect(calculateTotalPrice([])).toBe(0);
  });

  it('returns correct total without discount', () => {
    const items: CartItem[] = [
      { id: '1', name: 'Item A', price: 10, quantity: 2 },
      { id: '2', name: 'Item B', price: 5, quantity: 4 },
    ];

    expect(calculateTotalPrice(items)).toBe(40);
  });

  it('returns correct total with discount applied', () => {
    const items: CartItem[] = [
      { id: '1', name: 'Item A', price: 50, quantity: 1 },
      { id: '2', name: 'Item B', price: 25, quantity: 2 },
    ];

    const discount = 30;

    expect(calculateTotalPrice(items, discount)).toBe(70);
  });

  it('handles discount greater than subtotal (can return negative)', () => {
    const items: CartItem[] = [
      { id: '1', name: 'Item A', price: 10, quantity: 1 },
    ];

    expect(calculateTotalPrice(items, 15)).toBe(-5);
  });
});
