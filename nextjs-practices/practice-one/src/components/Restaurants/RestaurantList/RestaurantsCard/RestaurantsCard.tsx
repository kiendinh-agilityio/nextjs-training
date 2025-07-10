import Image from 'next/image';
import Link from 'next/link';
import { useOptimistic, useTransition } from 'react';
import { useSession } from 'next-auth/react';
import { Plus, Minus } from 'lucide-react';

import { cartAction } from '@/actions/cart';
import type { Product } from '@/types/product';
import { cn } from '@/lib/utils';
import { useCartStore } from '@/stores/useCartStore';
import { showLoginToast } from '@/utils/showLoginToast';

import { Card } from '@/components/common/ui/card';
import { Button } from '@/components/common/ui/button';

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
  const { data: session } = useSession();

  const itemId = String(id);
  const itemPrice = Number(price);
  const inCart = optimisticItems.some((item) => item.id === itemId);
  const maxLength = 100;
  const shortDescription =
    description.length > maxLength
      ? description.slice(0, maxLength) + '...'
      : description;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (!session?.user?.email) {
      showLoginToast();

      return;
    }

    startTransition(() => {
      setOptimisticItems([
        ...optimisticItems,
        { id: itemId, name, price: itemPrice, image, category, quantity: 1 },
      ]);

      addItem({
        id: itemId,
        name,
        price: itemPrice,
        image,
        category,
        quantity: 1,
      });

      cartAction({
        type: 'add',
        payload: { id: itemId, name, price: itemPrice, image, category },
      });
    });
  };

  const handleRemoveToCart = async (e: React.MouseEvent) => {
    e.preventDefault();

    startTransition(() => {
      setOptimisticItems(optimisticItems.filter((item) => item.id !== itemId));

      removeItem(itemId);

      cartAction({ type: 'remove', payload: itemId });
    });
  };

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
        <div className="flex min-h-[178px] flex-col justify-evenly text-black lg:pt-[19px]">
          <p className="mb-[15px] text-xl font-semiBold leading-[23px]">
            {name}
          </p>
          <p className="mb-2 font-base text-sm leading-[25px]">
            {shortDescription}
          </p>
          <p className="text-lg font-bold leading-[18px]">$ {price}</p>
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
