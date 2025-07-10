import Image from 'next/image';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useTransition } from 'react';

import { cartAction } from '@/actions/cart';
import { useCartStore } from '@/stores/useCartStore';
import { Button } from '@/components/common/ui/button';
import type { CartItem as CartItemType } from '@/types/cart';

interface CartItemProps {
  item: CartItemType;
}

const CartItem = ({ item }: CartItemProps) => {
  const { updateQuantity, removeItem } = useCartStore();
  const startTransition = useTransition()[1];

  const handleRemove = () => {
    removeItem(item.id);

    startTransition(async () => {
      await cartAction({ type: 'remove', payload: item.id });
    });
  };

  const handleDecrease = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);

      startTransition(async () => {
        await cartAction({
          type: 'update',
          payload: { id: item.id, quantity: item.quantity - 1 },
        });
      });
    } else {
      handleRemove();
    }
  };

  const handleIncrease = () => {
    updateQuantity(item.id, item.quantity + 1);

    startTransition(async () => {
      await cartAction({
        type: 'update',
        payload: { id: item.id, quantity: item.quantity + 1 },
      });
    });
  };

  return (
    <div className="flex flex-row items-center justify-between gap-6 py-6">
      <div className="flex flex-row items-center gap-8">
        {item.image && (
          <Image
            src={item.image}
            alt={item.name}
            width={112}
            height={112}
            className="object-contain"
          />
        )}
        <div className="flex flex-col gap-[12px] text-secondary">
          <p className="text-base font-semiBold">{item.name}</p>
          <p className="mb-[14px] text-[15px] leading-[18px] text-black">
            Category: {item.category}
          </p>
          <p className="text-[20px] font-semiBold leading-[25px]">
            $ {item.price.toFixed(2)}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-end gap-8">
        <Button
          variant="primary"
          className="h-[40px] w-[40px] rounded-full p-3"
          ariaLabel="Remove item"
          onClick={handleRemove}
        >
          <Trash2 className="h-[36px] w-[36px] text-white" />
        </Button>
        <div className="flex items-center rounded-full bg-primary px-4 py-1.5 hover:bg-orange-600 lg:px-6 lg:py-3">
          <Button
            variant="primary"
            className="h-4 w-4 rounded-full bg-transparent p-0 hover:bg-transparent focus:outline-none focus:ring-0"
            ariaLabel="Decrease quantity"
            onClick={handleDecrease}
          >
            <Minus />
          </Button>
          <p className="font-regular mx-4 min-w-[24px] text-center text-lg text-white">
            {item.quantity}
          </p>
          <Button
            variant="primary"
            className="h-4 w-4 rounded-full bg-transparent p-0 hover:bg-transparent focus:outline-none focus:ring-0"
            ariaLabel="Increase quantity"
            onClick={handleIncrease}
          >
            <Plus />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
