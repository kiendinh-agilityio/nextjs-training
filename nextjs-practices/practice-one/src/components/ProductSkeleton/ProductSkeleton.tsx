import { cn } from '@/lib/utils';

const ProductSkeleton = () => (
  <div
    className={cn(
      'w-full',
      'h-[220px] animate-pulse sm:h-[220px] md:h-[240px] lg:h-[260px]',
      'bg-muted shadow-[0_4px_24px_0_rgba(0,0,0,0.08)]',
      'rounded-xl border border-black/10',
    )}
  />
);

export default ProductSkeleton;
