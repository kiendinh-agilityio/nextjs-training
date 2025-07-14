import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { createMetadata } from '@/utils/metadata';
import { ROUTERS } from '@/constants/router';
import { BASE_URL } from '@/constants/url';
import CartContent from '@/components/Cart/CartContent/CartContent';

export const metadata = createMetadata({
  title: 'Cart Page',
  description:
    'Review your selected dishes, manage your cart, and proceed to secure checkout on Order.uk. Fast, simple, and convenient online food ordering experience.',
  keywords: ['cart', 'restaurant cart', 'Order.uk', 'checkout'],
  url: `${BASE_URL}${ROUTERS.CART}`,
  imageAlt: 'Order.uk Cart',
});

// Server component to check auth
const CartPage = async () => {
  const session = await auth();

  if (!session?.user?.email) {
    redirect(ROUTERS.LOGIN);
  }

  return <CartContent />;
};

export default CartPage;
