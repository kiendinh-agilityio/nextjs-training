import { cn } from '@/lib/utils';

const CartEmpty = () => (
  <div
    className={cn(
      'flex flex-col items-center justify-center',
      'min-h-[260px] w-full',
      'rounded-2xl border',
      'text-xl text-secondary',
    )}
  >
    Your cart is empty
  </div>
);

export default CartEmpty;
