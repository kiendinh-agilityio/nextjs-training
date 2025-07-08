import { Skeleton } from '@/components/common/ui/skeleton';
import { cn } from '@/lib/utils';
import ProductSkeleton from '@/components/ProductSkeleton/ProductSkeleton';

interface ProductDetailSkeletonProps {
  starCount?: number;
  ingredientCount?: number;
}

const ProductDetailSkeleton = ({
  starCount = 5,
  ingredientCount = 4,
}: ProductDetailSkeletonProps) => (
  <section>
    {/* Breadcrumb Skeleton */}
    <div className={cn('container mx-auto py-8 lg:px-0', 'mb-4')}>
      <div className={cn('flex gap-2 items-center')}>
        <Skeleton className="h-6 w-32" />
        <span className="text-gray-400">/</span>
        <Skeleton className="h-6 w-40" />
      </div>
    </div>
    <div
      className={cn(
        'container mx-auto py-8 lg:px-0',
        'flex flex-col md:flex-row gap-8 mt-0 md:mt-20',
      )}
    >
      {/* Image Skeleton */}
      <div
        className={cn(
          'flex-1 flex justify-center items-start md:items-center',
          'min-h-[400px]',
        )}
      >
        <Skeleton
          className={cn(
            'w-full max-w-[400px] h-[320px] md:h-[400px] rounded-xl object-cover',
          )}
        />
      </div>
      <div
        className={cn(
          'flex-1 font-regular text-gray-700 flex flex-col justify-center',
        )}
      >
        {/* Name Skeleton */}
        <Skeleton className="h-10 w-60 mb-4" />
        {/* Rating Skeleton */}
        <div className="flex items-center gap-1 mt-4 mb-4">
          {Array.from({ length: starCount }).map((_, i) => (
            <Skeleton key={i} className="w-8 h-8 rounded-full" />
          ))}
          <Skeleton className="ml-2 h-6 w-10" />
          <Skeleton className="h-6 w-6" />
        </div>
        {/* Price Skeleton */}
        <Skeleton className="h-8 w-32 mb-4" />
        {/* Description Skeleton */}
        <Skeleton className="h-5 w-full max-w-[500px] mb-4" />
        {/* Category Skeleton */}
        <div className="mb-4 flex items-center gap-2">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-5 w-24" />
        </div>
        {/* Ingredients Skeleton */}
        <div className="mb-4">
          <Skeleton className="h-5 w-32 mb-2" />
          <ul className="list-disc list-inside mt-2 flex flex-col gap-2">
            {Array.from({ length: ingredientCount }).map((_, i) => (
              <li key={i} className="flex items-center gap-2">
                <Skeleton className="h-4 w-4 rounded-full inline-block" />
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    </div>
  </section>
);

export default ProductDetailSkeleton;
