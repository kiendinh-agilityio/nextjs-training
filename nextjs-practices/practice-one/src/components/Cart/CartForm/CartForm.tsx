import { useState } from 'react';
import { Heading } from '@/components/common/ui/heading';
import { Button } from '@/components/common/ui/button';
import { cn } from '@/lib/utils';
import { useCartStore } from '@/stores/useCartStore';
import { toast } from 'sonner';

interface CartSummaryProps {
  subTotal: number;
  discount: number;
  total: number;
}

const CartForm = ({ subTotal, discount, total }: CartSummaryProps) => {
  const { items, clearCart } = useCartStore();
  const [isPending, setIsPending] = useState(false);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsPending(true);

    setTimeout(() => {
      setIsPending(false);

      toast.success('Your checkout was successful');

      clearCart();
    }, 1200);
  };

  return (
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
          <p>${total}</p>
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
        ariaLabel="Button checkout"
        onClick={handleCheckout}
        disabled={items.length === 0 || isPending}
      >
        {isPending ? 'Processing...' : 'Checkout'}
      </Button>
    </form>
  );
};

export default CartForm;
