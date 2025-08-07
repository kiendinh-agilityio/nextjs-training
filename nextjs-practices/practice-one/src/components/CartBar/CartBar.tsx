'use client';

// import nextjs hooks
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

// import constants
import { ROUTERS } from '@/constants/router';

// import stores
import { useCartStore } from '@/stores/useCartStore';

// import components
import { Button } from '@/components/common/ui/button';

// import utils
import { cn } from '@/lib/utils';
import { calculateTotalPrice, calculateCartCount } from '@/utils/calculateCart';

// import icon
import CartIcon from '@/components/Icons/CartIcon';

const CartBar = () => {
  const { items, discount } = useCartStore();
  const cartCount = calculateCartCount(items);
  const totalPrice = calculateTotalPrice(items, discount);

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
        'absolute right-0 top-0 flex items-center justify-between gap-4',
        'h-[70px] w-full px-4 sm:w-auto sm:px-6 xl:w-[250px]',
        'rounded-xl focus:outline-none focus:ring-0 lg:rounded-b-xl lg:rounded-t-none',
        'bg-green-700 text-white',
      )}
      onClick={handleCartClick}
      ariaLabel="Button Cart"
    >
      {/* Cart icon with badge */}
      <span className="relative flex items-center">
        <CartIcon className="h-[32px] w-[32px]" />
        {cartCount > 0 && (
          <span
            className={cn(
              'absolute -bottom-1 -right-1 flex items-center justify-center',
              'h-5 min-h-[20px] w-5 min-w-[20px]',
              'rounded-full border-2 border-white bg-primary shadow-lg',
              'text-[10px] font-bold text-white',
            )}
          >
            {cartCount}
          </span>
        )}
      </span>

      {/* Item count */}
      <span className="whitespace-nowrap border-l border-r border-white px-4 text-sm font-semiBold">
        {cartCount} Item{cartCount !== 1 ? 's' : ''}
      </span>

      {/* Total price */}
      <span className="whitespace-nowrap text-sm font-semiBold">
        $ {totalPrice.toFixed(2)}
      </span>
    </Button>
  );
};

export default CartBar;
