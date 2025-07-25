const CartFormSkeleton = () => (
  <div className="flex min-h-[260px] w-full flex-col gap-4 rounded-2xl border p-8 lg:max-w-md">
    <div>
      <h3 className="mb-4 text-lg font-bold">Order Summary</h3>
      <div className="mb-2 flex items-center justify-between">
        <span>Sub Total</span>
        <span className="inline-block h-[24px] w-[46px] animate-pulse rounded bg-gray-200 align-middle" />
      </div>
      <div className="mb-2 flex items-center justify-between">
        <p>
          Discount ({' '}
          <span className="inline-block h-4 w-6 animate-pulse rounded bg-gray-200 align-middle" />{' '}
          %)
        </p>
        <span className="inline-block h-4 w-8 animate-pulse rounded bg-gray-200" />
      </div>
      <div className="my-4 h-1 w-full rounded bg-gray-100" />
      <div className="flex items-center justify-between font-bold">
        <span>Total</span>
        <span className="inline-block h-6 w-16 animate-pulse rounded bg-gray-200" />
      </div>
    </div>
    <div className="flex gap-2">
      <input
        className="flex-1 rounded-lg border border-gray-200 bg-white px-4 py-2"
        placeholder="Apply Coupon Code"
        disabled
      />
      <button className="h-10 w-20 rounded bg-gray-200 text-white" disabled>
        Apply
      </button>
    </div>
    <button
      className="mt-2 h-12 w-full rounded bg-orange-200 font-bold text-white"
      disabled
    >
      Checkout
    </button>
  </div>
);

export default CartFormSkeleton;
