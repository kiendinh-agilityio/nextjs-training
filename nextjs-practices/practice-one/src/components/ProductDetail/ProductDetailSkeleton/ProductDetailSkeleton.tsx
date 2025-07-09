import { ChevronRight } from 'lucide-react';
import { Skeleton } from '@/components/common/ui/skeleton';
import { cn } from '@/lib/utils';
import ProductSkeleton from '@/components/ProductSkeleton/ProductSkeleton';

interface ProductDetailSkeletonProps {
  starCount?: number;
  ingredientCount?: number;
}

const ProductDetailSkeleton = ({
  starCount = 5,
  ingredientCount = 6,
}: ProductDetailSkeletonProps) => (
  <section className={cn('container mx-auto py-8 lg:px-0', 'mb-4')}>
    {/* Breadcrumb Skeleton */}
    <div className={cn('flex items-center gap-2')}>
      <Skeleton className="h-6 w-32" />
      <ChevronRight className="h-4 w-4" />
      <Skeleton className="h-6 w-40" />
    </div>
    <div className={cn('mt-20 flex flex-col gap-8 md:flex-row')}>
      {/* Image Skeleton */}
      <div className={cn('flex-1')}>
        <Skeleton
          className={cn(
            'h-[320px] w-full max-w-[400px] rounded-xl object-contain md:h-[400px] lg:h-[488px] lg:max-w-[752px]',
          )}
        />
      </div>
      <div
        className={cn(
          'font-regular flex flex-1 flex-col text-gray-700 lg:max-w-[752px]',
        )}
      >
        {/* Name Skeleton */}
        <Skeleton className="h-[32px] w-full" />
        {/* Rating Skeleton */}
        <div className="mt-8 flex h-[32px] items-center gap-1">
          {Array.from({ length: starCount }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-8 rounded-full" />
          ))}
          <Skeleton className="ml-2 h-6 w-10" />
          <Skeleton className="h-6 w-6" />
        </div>
        {/* Price Skeleton */}
        <Skeleton className="mb-4 mt-8 h-8 w-32" />
        {/* Description Skeleton */}
        <Skeleton className="mb-4 h-5 w-full max-w-[500px]" />
        {/* Category Skeleton */}
        <div className="mb-4 flex items-center gap-2">
          <Skeleton className="h-5 w-24" />
        </div>
        {/* Ingredients Skeleton */}
        <div className="mb-4">
          <Skeleton className="mb-2 h-5 w-32" />
          <ul className="mt-2 flex list-inside list-disc flex-col gap-2">
            {Array.from({ length: ingredientCount }).map((_, i) => (
              <li key={i} className="flex items-center gap-2">
                <Skeleton className="inline-block h-4 w-4 rounded-full" />
                <Skeleton className="h-4 w-32" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
    {/* RELATED PRODUCTS Skeleton */}
    <div className={cn('container mx-auto mt-20')}>
      <div className="mb-12 flex justify-center">
        <Skeleton className="h-10 w-72" />
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    </div>
  </section>
);

export default ProductDetailSkeleton;
