const CartFormSkeleton = () => (
  <div className="flex min-h-[260px] w-full animate-pulse flex-col gap-4 rounded-2xl border p-8 lg:max-w-md">
    <div>
      <div className="mb-4 h-6 w-32 rounded bg-gray-200" />
      <div className="mb-2 h-4 w-24 rounded bg-gray-100" />
      <div className="mb-2 h-4 w-20 rounded bg-gray-100" />
      <div className="my-4 h-1 w-full rounded bg-gray-100" />
      <div className="h-6 w-24 rounded bg-gray-200" />
    </div>
    <div className="flex gap-2">
      <div className="flex flex-1 items-center rounded-lg border border-gray-200 bg-white px-4 py-2">
        <div className="h-5 w-full rounded bg-gray-100" />
      </div>
      <div className="h-10 w-20 rounded bg-gray-200" />
    </div>
    <div className="mt-2 h-12 w-full rounded bg-gray-200" />
  </div>
);

export default CartFormSkeleton;
