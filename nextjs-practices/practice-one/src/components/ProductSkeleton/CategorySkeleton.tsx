import LoaderSkeleton from './LoaderSkeleton';
import { Skeleton } from '@/components/common/ui/skeleton';
import { cn } from '@/lib/utils';

interface CategorySkeletonSectionProps {
  count?: number;
}

const CategorySkeletonSection = ({
  count = 6,
}: CategorySkeletonSectionProps) => (
  <div>
    <Skeleton className={cn('mb-[40px] h-[44px] w-[240px] rounded-md')} />
    <div
      className={cn(
        'grid grid-cols-1 gap-[20px] lg:grid-cols-2 2xl:grid-cols-3',
      )}
    >
      <LoaderSkeleton count={count} />
    </div>
  </div>
);

export default CategorySkeletonSection;
