import { Heading } from '@/components/common/ui/heading';
import { Button } from '@/components/common/ui/button';
import { cn } from '@/lib/utils';

interface CartSummaryProps {
  subTotal: number;
  discount: number;
  total: number;
}

const CartForm = ({ subTotal, discount, total }: CartSummaryProps) => (
  <form
    className={cn(
      'flex flex-col gap-4 p-8',
      'min-h-[260px] w-full lg:max-w-md',
      'rounded-2xl border',
    )}
  >
    <div>
      <Heading as="h3" className="mb-4 text-lg font-bold">
        Order Summary
      </Heading>
      <div className="text-neutral-700 mb-2 flex justify-between">
        <p>Sub Total</p>
        <p className="font-bold">${subTotal.toFixed(2)}</p>
      </div>
      <div className="text-neutral-400 mb-2 flex justify-between">
        <p>Discount (-{discount}%)</p>
        <p>-{discount}</p>
      </div>
      <hr className="my-4" />
      <div className="flex justify-between text-lg font-bold">
        <p>Total</p>
        <p>{total}</p>
      </div>
    </div>
    <div className="flex gap-2">
      <div
        className={cn(
          'flex flex-1 items-center px-4 py-2',
          'rounded-lg border border-muted bg-white',
        )}
      >
        <input
          type="text"
          placeholder="Apply Coupon Code here"
          className="bg-transparent text-base outline-none"
        />
      </div>
      <Button
        className={cn(
          'px-6 py-2',
          'bg-[#a3a3a3] hover:bg-[#bdbdbd]',
          'font-medium text-white',
          'rounded-lg border',
        )}
        ariaLabel="Button apply coupon"
      >
        Apply
      </Button>
    </div>
    <Button
      className={cn(
        'mt-2 flex items-center justify-center gap-2 py-4',
        'w-full',
        'font-medium',
        'rounded-lg border',
      )}
      ariaLabel="Button checkout "
    >
      Go to Checkout <span className="text-2xl">→</span>
    </Button>
  </form>
);

export default CartForm;
