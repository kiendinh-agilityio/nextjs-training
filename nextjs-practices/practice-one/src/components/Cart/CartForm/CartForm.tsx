// import react hook
import { useState, useTransition, useEffect } from 'react';

// import toast notification
import { toast } from 'sonner';

// import components
import { Heading } from '@/components/common/ui/heading';
import { Button } from '@/components/common/ui/button';

// import lib
import { cn } from '@/lib/utils';

// import stores
import { useCartStore } from '@/stores/useCartStore';

// import actions
import { applyCoupon } from '@/actions/cart';

// import function utils
import { calculateDiscount } from '@/utils/calculateDiscount';

interface CartSummaryProps {
  subTotal: number;
}

const CartForm = ({ subTotal }: CartSummaryProps) => {
  const {
    items,
    clearCart,
    setCouponCart,
    clearCoupon,
    discount: storeDiscount,
  } = useCartStore();
  const [isPending, setIsPending] = useState(false);
  const [coupon, setCoupon] = useState('');
  const [couponMessage, setCouponMessage] = useState('');
  const [couponStatus, setCouponStatus] = useState<'success' | 'error' | null>(
    null,
  );
  const [isCouponPending, startCouponTransition] = useTransition();
  const [couponPercent, setCouponPercent] = useState<number | null>(null);

  useEffect(() => {
    clearCoupon();
    setCoupon('');
    setCouponMessage('');
    setCouponStatus(null);
  }, [items, clearCoupon]);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsPending(true);

    setTimeout(() => {
      setIsPending(false);

      toast.success(
        <p className="ml-2 text-secondary">Your checkout was successful</p>,
      );

      clearCart();
      clearCoupon();

      // Reset local states
      setCoupon('');
      setCouponMessage('');
      setCouponStatus(null);
      setCouponPercent(null);
    }, 1200);
  };

  const handleApplyCoupon = () => {
    startCouponTransition(async () => {
      setCouponMessage('');
      setCouponStatus(null);

      const result = await applyCoupon({ code: coupon });

      setCouponMessage(result.message);

      if (result.valid && result.coupon) {
        const { discount, percent } = calculateDiscount(
          subTotal,
          result.coupon,
        );
        setCouponCart(coupon, discount);
        setCouponStatus('success');
        setCouponPercent(percent);
      } else {
        setCouponStatus('error');
        setCouponPercent(null);
      }
    });
  };

  const handleCouponChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setCoupon(e.target.value);

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
          <p>Discount (-{couponPercent ?? 0}%)</p>
          <p>-{storeDiscount}</p>
        </div>
        <hr className="my-4" />
        <div className="flex justify-between text-lg font-bold">
          <p>Total</p>
          <p>${(subTotal - storeDiscount).toFixed(2)}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Apply Coupon Code here"
          className="w-full rounded-lg border border-muted bg-white px-4 py-2 text-base outline-none"
          value={coupon}
          onChange={handleCouponChange}
          disabled={isCouponPending}
        />
        <Button
          className={cn(
            'px-6 py-2',
            'bg-gray-400 hover:bg-gray-300',
            'font-medium text-white',
            'rounded-lg border',
          )}
          ariaLabel="Button apply coupon"
          type="button"
          disabled={isCouponPending || !coupon || items.length === 0}
          onClick={handleApplyCoupon}
        >
          Apply
        </Button>
      </div>
      {couponMessage && (
        <div
          className={
            'min-h-[20px] text-sm ' +
            (couponStatus === 'success' ? 'text-success' : 'text-error')
          }
        >
          {couponMessage}
        </div>
      )}
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
