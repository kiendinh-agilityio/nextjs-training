'use client';

// import react hooks
import { useSession } from 'next-auth/react';
import { useOptimistic, useTransition } from 'react';

// import icons
import { Plus, Minus } from 'lucide-react';

// import stores
import { useCartStore } from '@/stores/useCartStore';

// import hooks
import { useCartAction } from '@/hooks/useCartAction';

// import types
import { CartItem } from '@/types/cart';
import { Product } from '@/types/product';

// import components
import { Button } from '@/components/common/ui/button';
import LoginToast from '@/components/LoginToast/LoginToast';

interface Props {
  product: Product;
}

const ProductActions = ({ product }: Props) => {
  const { data: session } = useSession();
  const { items, addItem, removeItem } = useCartStore();
  const [optimisticItems, setOptimisticItems] = useOptimistic(items);
  const [isLoading, startTransition] = useTransition();
  const { formAction } = useCartAction();

  const inCart = optimisticItems.some(
    (item) => String(item.id) === String(product.id),
  );

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!session?.user?.email) {
      LoginToast();
      return;
    }

    const newItem: CartItem = {
      id: String(product.id),
      name: product.name,
      price: Number(product.price),
      image: product.image,
      category: product.category,
      quantity: 1,
    };

    startTransition(() => {
      setOptimisticItems([...optimisticItems, newItem]);
      addItem(newItem);
      formAction({ type: 'add', payload: newItem });
    });
  };

  const handleRemoveFromCart = (e: React.MouseEvent) => {
    e.preventDefault();

    startTransition(() => {
      setOptimisticItems(
        optimisticItems.filter(
          (item) => String(item.id) !== String(product.id),
        ),
      );
      removeItem(String(product.id));
      formAction({ type: 'remove', payload: String(product.id) });
    });
  };

  return (
    <div className="mb-4 mt-7 flex justify-center lg:justify-end">
      {inCart ? (
        <Button
          variant="secondary"
          size="sm"
          ariaLabel="Button remove from cart"
          onClick={handleRemoveFromCart}
          icon={<Minus className="h-[20px] w-[20px]" />}
          className="w-[256px] rounded-full"
          disabled={isLoading}
        >
          Remove from Cart
        </Button>
      ) : (
        <Button
          variant="primary"
          size="sm"
          ariaLabel="Button add to cart"
          onClick={handleAddToCart}
          icon={<Plus className="h-[20px] w-[20px]" />}
          className="w-[256px] rounded-full"
          disabled={isLoading}
        >
          Add to Cart
        </Button>
      )}
    </div>
  );
};

export default ProductActions;
