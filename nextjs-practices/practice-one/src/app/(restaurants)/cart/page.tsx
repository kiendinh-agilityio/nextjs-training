'use client';

import {
  CartContainer,
  CartLayout,
  CartList,
  CartForm,
} from '@/components/Cart';
import { useCartStore } from '@/stores/useCartStore';

const CartPage = () => {
  const { subTotal, discount, total } = useCartStore();

  return (
    <CartContainer>
      <CartLayout>
        <CartList />
        <CartForm subTotal={subTotal} discount={discount} total={total} />
      </CartLayout>
    </CartContainer>
  );
};

export default CartPage;
