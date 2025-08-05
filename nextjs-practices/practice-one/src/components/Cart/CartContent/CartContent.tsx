'use client';

import { Suspense } from 'react';

// import stores
import { useCartStore } from '@/stores/useCartStore';

// import components
import {
  CartContainer,
  CartLayout,
  CartList,
  CartForm,
  CartEmpty,
} from '@/components/Cart';
import {
  CartListSkeleton,
  CartFormSkeleton,
} from '@/components/Cart/CartSkeleton';

const CartContent = () => {
  const { subTotal, items } = useCartStore();

  return (
    <CartContainer>
      <CartLayout>
        <Suspense fallback={<CartListSkeleton />}>
          {items.length ? <CartList /> : <CartEmpty />}
        </Suspense>
        <Suspense fallback={<CartFormSkeleton />}>
          <CartForm subTotal={subTotal} />
        </Suspense>
      </CartLayout>
    </CartContainer>
  );
};

export default CartContent;
