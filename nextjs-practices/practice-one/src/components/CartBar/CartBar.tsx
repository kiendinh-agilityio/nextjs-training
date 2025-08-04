'use client';

// import react hooks
import { useOptimistic } from 'react';

// import nextjs hooks
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ROUTERS } from '@/constants/router';
import { useCartStore } from '@/stores/useCartStore';
import { Button } from '@/components/common/ui/button';
import { cn } from '@/lib/utils';
import CartIcon from '@/components/Icons/CartIcon';

const CartBar = () => {
  const { items } = useCartStore();
  const [optimisticItems] = useOptimistic(items);
  const cartCount = optimisticItems.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );
  const { data: session } = useSession();
  const router = useRouter();

  const handleCartClick = () => {
    if (session?.user?.email) {
      router.push(ROUTERS.CART);
    } else {
      router.push(ROUTERS.LOGIN);
    }
  };

  return (
    <Button
      variant="tertiary"
      type="button"
      className={cn(
        'absolute right-0 top-0 flex items-center justify-center',
        'px-[37px] pb-[12px] pt-[15px]',
        'h-[70px] w-full sm:w-auto',
        'rounded-xl focus:outline-none focus:ring-0 lg:rounded-b-xl lg:rounded-t-none',
      )}
      onClick={handleCartClick}
      ariaLabel="Button Cart"
    >
      <span className="relative">
        <CartIcon className="lg:[w-43px] h-[43px]" />
        {cartCount > 0 && (
          <span
            className={cn(
              'absolute -right-2 -top-2 flex items-center justify-center',
              'h-6 min-h-[24px] w-6 min-w-[24px]',
              'rounded-full border-2 border-white bg-primary shadow-lg',
              'text-xs font-bold text-white',
            )}
          >
            {cartCount}
          </span>
        )}
      </span>
    </Button>
  );
};

export default CartBar;
