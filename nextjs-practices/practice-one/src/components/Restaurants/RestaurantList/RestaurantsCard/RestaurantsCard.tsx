import Image from 'next/image';
import { Plus } from 'lucide-react';
import { Card } from '@/components/common/ui/card';
import { Button } from '@/components/common/ui/button';
import type { Product } from '@/types/product';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const RestaurantsCard = ({ id, name, description, price, image }: Product) => {
  const maxLength = 100;
  const shortDescription =
    description.length > maxLength
      ? description.slice(0, maxLength) + '...'
      : description;

  return (
    <Link href={`/product-detail/${id}`} className="block">
      <Card
        className={cn(
          'flex justify-between gap-[18px] rounded-[12px] bg-[#fdfdfd] px-[30px] py-[24px]',
          'border border-black/10 shadow-[5px_5px_34px_0_rgba(0,0,0,0.25)]',
          '2xl:w-[496px]',
          'cursor-pointer',
          'transition-all duration-200 hover:scale-100 hover:shadow-[0_8px_32px_0_rgba(0,0,0,0.40)] xl:hover:scale-105',
        )}
      >
        <div
          className={cn(
            'flex min-h-[178px] flex-col justify-evenly text-black lg:pt-[19px]',
          )}
        >
          <p className={cn('mb-[15px] text-xl font-semiBold leading-[23px]')}>
            {name}
          </p>
          <p className={cn('mb-2 font-base text-sm leading-[25px]')}>
            {shortDescription}
          </p>
          <p className={cn('text-lg font-bold leading-[18px]')}>GDP {price}</p>
        </div>
        <div className={cn('relative h-40 w-40 flex-shrink-0')}>
          <Image
            src={image}
            alt={name}
            fill
            className={cn('rounded-xl object-cover')}
          />
          <Button
            variant="secondary"
            className={cn(
              'absolute bottom-0 right-0 z-10 h-[49px] w-[49px] rounded-full p-0 shadow-lg',
            )}
            ariaLabel="Button add to cart"
          >
            {<Plus className={cn('h-[25px] w-[25px]')} />}
          </Button>
        </div>
      </Card>
    </Link>
  );
};

export default RestaurantsCard;
