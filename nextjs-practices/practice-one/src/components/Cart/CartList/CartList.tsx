'use client';

// import react hooks
import React from 'react';

// import stores
import { useCartStore } from '@/stores/useCartStore';

// import types
import { CartItem } from '@/types/cart';

// import components
import CartEmpty from '../CartEmpty/CartEmpty';
import CartItemComponent from './CartItem/CartItem';

const CartList = () => {
  const { items } = useCartStore();

  if (!items.length) return <CartEmpty />;

  return (
    <div className="w-full rounded-3xl border bg-white p-6">
      {items.map((item: CartItem, idx: number) => (
        <React.Fragment key={item.id}>
          <CartItemComponent item={item} />
          {idx < items.length - 1 && <div className="my-6 border-t" />}
        </React.Fragment>
      ))}
    </div>
  );
};

export default CartList;
