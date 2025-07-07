import { Card } from '@/components/common/ui/card';
import { Skeleton } from '@/components/common/ui/skeleton';
import { cn } from '@/lib/utils';

const ProductSkeleton = () => (
  <Card
    className={cn(
      'flex justify-between py-[24px] px-[30px] bg-[#fdfdfd] gap-[18px] rounded-[12px]',
      'border border-black/10 shadow-[5px_5px_34px_0_rgba(0,0,0,0.25)] lg',
      '2xl:w-[496px]',
    )}
  >
    <div
      className={cn(
        'flex flex-col justify-evenly min-h-[178px] text-black lg:pt-[19px] w-full',
      )}
    >
      <Skeleton className={cn('mb-[15px] h-7 w-40')} />
      <Skeleton className={cn('mb-2 h-5 w-60')} />
      <Skeleton className={cn('h-6 w-24')} />
    </div>
    <div className={cn('relative w-40 h-40 flex-shrink-0 flex items-end')}>
      <Skeleton
        className={cn('absolute top-0 left-0 w-full h-full rounded-xl')}
      />
      <div className={cn('absolute bottom-0 right-0')}>
        <Skeleton className={cn('rounded-full w-[49px] h-[49px] shadow-lg')} />
      </div>
    </div>
  </Card>
);

export default ProductSkeleton;
