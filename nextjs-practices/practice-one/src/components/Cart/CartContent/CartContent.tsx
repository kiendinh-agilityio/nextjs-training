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
  const { subTotal, items, _hasHydrated } = useCartStore();

  if (!_hasHydrated) {
    return (
      <CartContainer>
        <CartLayout>
          <CartListSkeleton />
          <CartFormSkeleton />
        </CartLayout>
      </CartContainer>
    );
  }

  return (
    <CartContainer>
      <CartLayout>
        <Suspense fallback={<div>Loading cart...</div>}>
          {items.length ? <CartList /> : <CartEmpty />}
        </Suspense>
        <CartForm subTotal={subTotal} />
      </CartLayout>
    </CartContainer>
  );
};

export default CartContent;
