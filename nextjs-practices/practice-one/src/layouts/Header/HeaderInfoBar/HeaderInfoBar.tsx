// import lib
import { cn } from '@/lib/utils';

// import components
import { Button } from '@/components/common/ui/button';
import CartBar from '@/components/CartBar/CartBar';
import LocationIcon from '@/components/Icons/LocationIcon';

const HeaderInfoBar = () => (
  <div
    className={cn(
      'relative flex justify-between',
      'px-[37px] py-[25px] xl:pb-[20px]',
      'rounded-xl border border-base bg-gray-50 lg:rounded-b-xl lg:rounded-t-none',
      'text-xs font-medium text-black lg:text-[15px]',
    )}
  >
    <p className="hidden sm:flex md:items-center">
      <span className="mr-[15px]">🌟</span> Get 5% Off your first order,{' '}
      <span className="ml-1 font-bold text-primary">Promo: ORDER5</span>
    </p>
    <div className="hidden items-center justify-center gap-[25px] lg:pr-60 xl:flex">
      <p className="flex items-center gap-[15px]">
        <LocationIcon /> Regent Street, A4, A4201, London
      </p>
      <Button
        ariaLabel="Change Location Button"
        className="border-unset h-0 cursor-not-allowed bg-transparent p-0 font-bold text-primary focus:border-transparent focus:outline-none focus:ring-0"
      >
        Change Location
      </Button>
    </div>
    <CartBar />
  </div>
);

export default HeaderInfoBar;
