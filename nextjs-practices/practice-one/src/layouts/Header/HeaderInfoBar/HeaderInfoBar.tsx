import { cn } from '@/lib/utils';
import CartBar from '@/components/CartBar/CartBar';
import LocationIcon from '@/components/Icons/LocationIcon';

const HeaderInfoBar = () => (
  <div
    className={cn(
      'relative flex justify-between',
      'px-[37px] py-[25px] xl:pb-[20px]',
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
    <CartBar />
  </div>
);

export default HeaderInfoBar;
