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
          'flex justify-between py-[24px] px-[30px] bg-[#fdfdfd] gap-[18px] rounded-[12px]',
          'border border-black/10 shadow-[5px_5px_34px_0_rgba(0,0,0,0.25)] lg',
          '2xl:w-[496px]',
          'cursor-pointer',
        )}
      >
        <div
          className={cn(
            'flex flex-col justify-evenly min-h-[178px] text-black lg:pt-[19px]',
          )}
        >
          <p className={cn('text-xl leading-[23px] font-semiBold mb-[15px]')}>
            {name}
          </p>
          <p className={cn('font-base text-sm leading-[25px] mb-2')}>
            {shortDescription}
          </p>
          <p className={cn('font-bold text-lg leading-[18px]')}>GDP {price}</p>
        </div>
        <div className={cn('relative w-40 h-40 flex-shrink-0')}>
          <Image
            src={image}
            alt={name}
            fill
            className={cn('object-cover rounded-xl')}
          />
          <Button
            variant="secondary"
            className={cn(
              'absolute bottom-0 right-0 rounded-full w-[49px] h-[49px] p-0 shadow-lg z-10',
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
