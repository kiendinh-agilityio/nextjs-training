'use client';

import { cn } from '@/lib/utils';
import { useOptimistic } from 'react';

import LocationIcon from '@/components/Icons/LocationIcon';
import CartIcon from '@/components/Icons/CartIcon';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ROUTERS } from '@/constants/router';
import { useCartStore } from '@/stores/useCartStore';

const HeaderInfoBar = () => {
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
    <div
      className={cn(
        'relative flex justify-between',
        'px-[37px] pb-[20px] pt-[25px]',
        'rounded-xl border border-base bg-[#fafafa] lg:rounded-b-xl lg:rounded-t-none',
        'text-[15px] font-medium text-black',
      )}
    >
      <p className="hidden sm:flex md:items-center">
        <span className="mr-[15px]">🌟</span> Get 5% Off your first order,{' '}
        <span className="ml-1 font-bold text-primary">Promo: ORDER5</span>
      </p>
      <div className="hidden items-center justify-center gap-[25px] lg:pr-32 xl:flex">
        <p className="flex gap-[15px]">
          <LocationIcon /> Regent Street, A4, A4201, London
        </p>
        <p className="font-bold text-primary">Change Location</p>
      </div>
      <button
        type="button"
        className={cn(
          'absolute right-0 top-0 flex items-center justify-center',
          'px-[37px] pb-[12px] pt-[15px]',
          'w-full sm:w-auto',
          'rounded-xl bg-success lg:rounded-b-xl lg:rounded-t-none',
        )}
        onClick={handleCartClick}
      >
        <div className="relative">
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
        </div>
      </button>
    </div>
  );
};

export default HeaderInfoBar;
