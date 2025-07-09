import { cn } from '@/lib/utils';

const ProductSkeleton = () => (
  <div
    className={cn(
      'w-full h-[220px] sm:h-[220px] md:h-[240px] lg:h-[260px] bg-muted',
      'border border-black/10 rounded-xl shadow-[0_4px_24px_0_rgba(0,0,0,0.08)]',
      'animate-pulse',
    )}
  />
);

export default ProductSkeleton;
