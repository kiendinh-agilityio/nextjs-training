import { Heading } from '@/components/common/ui/heading';
import { Button } from '@/components/common/ui/button';

interface CartSummaryProps {
  subTotal: number;
  discount: number;
  total: number;
}

const CartForm = ({ subTotal, discount, total }: CartSummaryProps) => (
  <form className="flex min-h-[260px] w-full flex-col gap-4 rounded-2xl border p-8 lg:max-w-md">
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
      <div className="flex flex-1 items-center rounded-lg border border-muted bg-white px-4 py-2">
        <input
          type="text"
          placeholder="Apply Coupon Code here"
          className="bg-transparent text-base outline-none"
        />
      </div>
      <Button
        className="rounded-lg bg-[#a3a3a3] px-6 py-2 font-medium text-white hover:bg-[#bdbdbd]"
        ariaLabel="Button apply coupon"
      >
        Apply
      </Button>
    </div>
    <Button
      className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg py-4 font-medium"
      ariaLabel="Button checkout "
    >
      Go to Checkout <span className="text-2xl">→</span>
    </Button>
  </form>
);

export default CartForm;
