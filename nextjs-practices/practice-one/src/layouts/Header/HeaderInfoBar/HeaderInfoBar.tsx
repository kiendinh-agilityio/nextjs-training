import { cn } from '@/lib/utils';

import LocationIcon from '@/components/Icons/LocationIcon';
import CartIcon from '@/components/Icons/CartIcon';
import Link from 'next/link';

const HeaderInfoBar = () => {
  return (
    <div
      className={cn(
        'relative flex justify-between',
        'rounded-xl border border-base bg-[#fafafa] lg:rounded-b-xl lg:rounded-t-none',
        'text-[15px] font-medium text-black',
        'px-[37px] pb-[20px] pt-[25px]',
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
      <Link
        href="/cart"
        className={cn(
          'absolute right-0 top-0 flex w-full items-center justify-center sm:w-auto',
          'rounded-xl bg-success lg:rounded-b-xl lg:rounded-t-none',
          'px-[37px] pb-[12px] pt-[15px]',
        )}
      >
        <CartIcon className="lg:[w-43px] h-[43px]" />
      </Link>
    </div>
  );
};

export default HeaderInfoBar;
