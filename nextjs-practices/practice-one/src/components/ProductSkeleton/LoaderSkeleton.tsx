import ProductSkeleton from './ProductSkeleton';

interface SkeletonLoaderProps {
  count?: number;
}

const SkeletonLoader = ({ count = 3 }: SkeletonLoaderProps) => (
  <>
    {Array.from({ length: count }).map((_, i) => (
      // eslint-disable-next-line react/no-array-index-key
      <ProductSkeleton key={`skeleton-${i}`} />
    ))}
  </>
);

export default SkeletonLoader;
