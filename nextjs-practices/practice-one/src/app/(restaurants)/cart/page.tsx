'use client';

import {
  CartContainer,
  CartLayout,
  CartItems,
  CartForm,
} from '@/components/Cart';
import { useCartStore } from '@/stores/useCartStore';

const CartPage = () => {
  const { subTotal, discount, total } = useCartStore();

  return (
    <CartContainer>
      <CartLayout>
        <CartItems />
        <CartForm subTotal={subTotal} discount={discount} total={total} />
      </CartLayout>
    </CartContainer>
  );
};

export default CartPage;
