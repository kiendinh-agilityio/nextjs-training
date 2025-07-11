import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { ROUTERS } from '@/constants/router';
import CartContent from '@/components/Cart/CartContent/CartContent';

// Server component to check auth
const CartPage = async () => {
  const session = await auth();

  if (!session?.user?.email) {
    redirect(ROUTERS.LOGIN);
  }

  return <CartContent />;
};

export default CartPage;
