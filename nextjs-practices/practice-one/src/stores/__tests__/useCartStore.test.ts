import { act } from '@testing-library/react';
import { useCartStore } from '../useCartStore';
import type { CartItem } from '@/types/cart';

jest.unmock('@/stores/useCartStore');

describe('useCartStore', () => {
  const sampleItem: CartItem = {
    id: '1',
    name: 'Sample',
    price: 100,
    quantity: 1,
  };

  beforeEach(() => {
    act(() => {
      useCartStore.getState().clearCart();
      useCartStore.getState().clearCoupon();
      useCartStore.getState().setHasHydrated(false);
    });
  });

  it('should initialize with default values', () => {
    const state = useCartStore.getState();

    expect(state.items).toEqual([]);
    expect(state.subTotal).toBe(0);
    expect(state.discount).toBe(0);
    expect(state.total).toBe(0);
    expect(state.couponCode).toBeUndefined();
    expect(state._hasHydrated).toBe(false);
  });

  it('should add an item to the cart', () => {
    act(() => {
      useCartStore.getState().addItem(sampleItem);
    });
    const state = useCartStore.getState();

    expect(state.items.length).toBe(1);
    expect(state.items[0].id).toBe(sampleItem.id);
    expect(state.items[0].quantity).toBe(1);
    expect(state.subTotal).toBe(sampleItem.price);
    expect(state.total).toBe(sampleItem.price);
  });

  it('should increase quantity if item already exists', () => {
    act(() => {
      useCartStore.getState().addItem(sampleItem);
      useCartStore.getState().addItem(sampleItem);
    });

    const state = useCartStore.getState();
    expect(state.items[0].quantity).toBe(2);
    expect(state.subTotal).toBe(sampleItem.price * 2);
  });

  it('should remove an item from the cart', () => {
    act(() => {
      useCartStore.getState().addItem(sampleItem);
      useCartStore.getState().removeItem(sampleItem.id);
    });

    const state = useCartStore.getState();
    expect(state.items.length).toBe(0);
    expect(state.subTotal).toBe(0);
    expect(state.total).toBe(0);
  });

  it('should update item quantity', () => {
    act(() => {
      useCartStore.getState().addItem(sampleItem);
      useCartStore.getState().updateQuantity(sampleItem.id, 5);
    });
    const state = useCartStore.getState();
    expect(state.items[0].quantity).toBe(5);
    expect(state.subTotal).toBe(sampleItem.price * 5);
  });

  it('should remove item if quantity is set to 0', () => {
    act(() => {
      useCartStore.getState().addItem(sampleItem);
      useCartStore.getState().updateQuantity(sampleItem.id, 0);
    });
    const state = useCartStore.getState();
    expect(state.items.length).toBe(0);
  });

  it('should clear the cart', () => {
    act(() => {
      useCartStore.getState().addItem(sampleItem);
      useCartStore.getState().clearCart();
    });
    const state = useCartStore.getState();

    expect(state.items).toEqual([]);
    expect(state.subTotal).toBe(0);
    expect(state.discount).toBe(0);
    expect(state.total).toBe(0);
    expect(state.couponCode).toBeUndefined();
  });

  it('should set coupon and discount', () => {
    act(() => {
      useCartStore.getState().addItem(sampleItem);
      useCartStore.getState().setCouponCart('CODE10', 10);
    });

    const state = useCartStore.getState();
    expect(state.couponCode).toBe('CODE10');
    expect(state.discount).toBe(10);
    expect(state.total).toBe(state.subTotal - 10);
  });

  it('should clear coupon', () => {
    act(() => {
      useCartStore.getState().addItem(sampleItem);
      useCartStore.getState().setCouponCart('CODE10', 10);
      useCartStore.getState().clearCoupon();
    });

    const state = useCartStore.getState();
    expect(state.couponCode).toBeUndefined();
    expect(state.discount).toBe(0);
    expect(state.total).toBe(state.subTotal);
  });

  it('should set and get _hasHydrated', () => {
    act(() => {
      useCartStore.getState().setHasHydrated(true);
    });
    const state = useCartStore.getState();
    expect(state._hasHydrated).toBe(true);
  });
});
