import Image from 'next/image';
import Link from 'next/link';
import { useOptimistic, useTransition } from 'react';
import { useSession } from 'next-auth/react';
import { Plus, Minus } from 'lucide-react';

import type { Product } from '@/types/product';
import { CartItem } from '@/types/cart';
import { cn } from '@/lib/utils';
import { truncateText } from '@/utils/common';
import { useCartStore } from '@/stores/useCartStore';
import { useCartAction } from '@/hooks/useCartAction';
import { DESCRIPTION_MAX_LENGTH } from '@/constants/common';

import { Card } from '@/components/common/ui/card';
import { Button } from '@/components/common/ui/button';
import LoginToast from '@/components/LoginToast/LoginToast';

const RestaurantsCard = ({
  id,
  name,
  description,
  price,
  image,
  category,
}: Product) => {
  const { items, addItem, removeItem } = useCartStore();
  const [optimisticItems, setOptimisticItems] = useOptimistic(items);
  const [isPending, startTransition] = useTransition();
  const { formAction } = useCartAction();
  const { data: session } = useSession();

  const itemId = String(id);
  const itemPrice = Number(price);
  const inCart = optimisticItems.some((item: CartItem) => item.id === itemId);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (!session?.user?.email) {
      LoginToast();
      return;
    }

    const newItem: CartItem = {
      id: itemId,
      name,
      price: itemPrice,
      image,
      category,
      quantity: 1,
    };

    startTransition(() => {
      setOptimisticItems([...optimisticItems, newItem]);
      formAction({
        type: 'add',
        payload: { id: itemId, name, price: itemPrice, image, category },
      });
    });

    addItem(newItem);
  };

  const handleRemoveToCart = async (e: React.MouseEvent) => {
    e.preventDefault();

    startTransition(() => {
      setOptimisticItems(
        optimisticItems.filter((item: CartItem) => item.id !== itemId),
      );

      formAction({ type: 'remove', payload: itemId });
    });

    removeItem(itemId);
  };

  return (
    <Link href={`/product-detail/${id}`} className="block">
      <Card
        className={cn(
          'flex justify-between gap-[18px] px-[30px] py-[24px]',
          'min-h-[300px] md:min-h-[245px] 2xl:w-[496px]',
          'bg-[#fdfdfd]',
          'cursor-pointer rounded-[12px] border border-black/10 shadow-[5px_5px_34px_0_rgba(0,0,0,0.25)]',
          'transition-all duration-200 hover:scale-100 hover:shadow-[0_8px_32px_0_rgba(0,0,0,0.40)] xl:hover:scale-105',
        )}
      >
        <div className="flex h-[170px] flex-col justify-evenly text-black lg:pt-[19px]">
          <p className="mb-6 text-sm font-semiBold leading-[23px] md:text-xl lg:h-[46px]">
            {name}
          </p>
          <p className="mb-3 font-base text-xs leading-[25px] md:text-sm lg:h-[90px]">
            {truncateText(description, DESCRIPTION_MAX_LENGTH)}
          </p>
          <p className="text-lg font-bold leading-[18px]">${price}</p>
        </div>
        <div className="relative h-40 w-40 flex-shrink-0">
          <Image
            src={image}
            alt={name}
            fill
            className="rounded-xl object-cover"
          />
          <Button
            variant="secondary"
            className="absolute bottom-0 right-0 z-10 h-[49px] w-[49px] rounded-full p-0 shadow-lg"
            ariaLabel={
              inCart ? 'Button remove from cart' : 'Button add to cart'
            }
            onClick={inCart ? handleRemoveToCart : handleAddToCart}
            disabled={isPending}
          >
            {inCart ? (
              <Minus className="h-[25px] w-[25px]" />
            ) : (
              <Plus className="h-[25px] w-[25px]" />
            )}
          </Button>
        </div>
      </Card>
    </Link>
  );
};

export default RestaurantsCard;
