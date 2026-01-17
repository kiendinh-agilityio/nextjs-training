import { cn } from '@/lib/utils';

const ProductSkeleton = () => (
  <div
    className={cn(
      'w-full',
      'h-[220px] animate-pulse sm:h-[220px] md:h-[240px] lg:h-[260px]',
      'bg-muted shadow-sm',
      'rounded-xl border border-black/10',
    )}
  />
);

export default ProductSkeleton;
