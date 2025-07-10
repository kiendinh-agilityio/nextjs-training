import React from 'react';

import { useCartStore } from '@/stores/useCartStore';
import CartEmpty from '../CartEmpty/CartEmpty';
import CartItem from './CartItem/CartItem';

const CartList = () => {
  const { items } = useCartStore();
  if (!items.length) return <CartEmpty />;

  return (
    <div className="w-full rounded-3xl border bg-white p-6">
      {items.map((item, idx) => (
        <React.Fragment key={item.id}>
          <CartItem item={item} />
          {idx < items.length - 1 && <div className="my-6 border-t" />}
        </React.Fragment>
      ))}
    </div>
  );
};

export default CartList;
