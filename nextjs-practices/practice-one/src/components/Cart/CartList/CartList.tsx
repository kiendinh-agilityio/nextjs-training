'use client';

import React, { useOptimistic, useTransition } from 'react';

import { useCartStore } from '@/stores/useCartStore';
import { CartItem } from '@/types/cart';
import CartEmpty from '../CartEmpty/CartEmpty';
import CartItemComponent from './CartItem/CartItem';

const CartList = () => {
  const { items } = useCartStore();
  const [optimisticItems] = useOptimistic(items);
  const [isTransitioning] = useTransition();

  // Use optimistic items when there's a transition
  const displayItems = isTransitioning ? optimisticItems : items;

  if (!displayItems.length) return <CartEmpty />;

  return (
    <div className="w-full rounded-3xl border bg-white p-6">
      {displayItems.map((item: CartItem, idx: number) => (
        <React.Fragment key={item.id}>
          <CartItemComponent item={item} />
          {idx < displayItems.length - 1 && <div className="my-6 border-t" />}
        </React.Fragment>
      ))}
    </div>
  );
};

export default CartList;
