'use client';

import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { Plus, Minus } from 'lucide-react';

import { useCartStore } from '@/stores/useCartStore';
import { Button } from '@/components/common/ui/button';
import { showLoginToast } from '@/utils/showLoginToast';
import { cartAction } from '@/actions/cart';

import { Product } from '@/types/product';
import { Heading } from '@/components/common/ui/heading';
import { ProductRating } from '@/components/ProductDetail';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
} from '@/components/common/ui/breadcrumb';

interface ProductDetailContentProps {
  product: Product;
}

const ProductDetailContent = ({ product }: ProductDetailContentProps) => {
  const { data: session } = useSession();
  const { items, addItem, removeItem } = useCartStore();

  const inCart = items.some((item) => String(item.id) === String(product.id));

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!session?.user?.email) {
      showLoginToast();
      return;
    }

    addItem({
      id: String(product.id),
      name: product.name,
      price: Number(product.price),
      image: product.image,
      category: product.category,
      quantity: 1,
    });

    cartAction({
      type: 'add',
      payload: {
        id: String(product.id),
        name: product.name,
        price: Number(product.price),
        image: product.image,
        category: product.category,
      },
    });
  };

  const handleRemoveFromCart = (e: React.MouseEvent) => {
    e.preventDefault();
    removeItem(String(product.id));
  };

  return (
    <section className="mt-[50px] lg:mt-0">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/restaurant">Restaurants</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbPage>{product.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="mt-20 flex flex-col gap-8 md:flex-row">
        <Image
          src={product.image}
          alt={product.name}
          width={400}
          height={400}
          className="flex flex-1 items-center justify-center rounded-xl object-none"
        />
        <div className="font-regular flex-1 text-gray-700">
          <Heading size="md">{product.name}</Heading>
          <ProductRating
            rating={parseFloat(product.rating?.replace('rating ', '') ?? '0')}
          />
          <p className="mb-4 mt-8 flex items-center text-2xl font-bold text-gray-900">
            $ {product.price}
          </p>
          <p className="mb-4 text-gray-700">{product.description}</p>
          <p className="mb-4">
            <span className="font-semibold">Category:</span> {product.category}
          </p>
          <div className="mb-4">
            <p className="font-semibold">Ingredients:</p>
            <ul className="mt-2 flex list-inside list-disc flex-col gap-2">
              {product.ingredients?.map((ing) => (
                <li className="font-regular text-sm lg:text-base" key={ing}>
                  {ing}
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-4 flex justify-center lg:justify-end">
            {inCart ? (
              <Button
                variant="secondary"
                size="sm"
                ariaLabel="Button remove from cart"
                onClick={handleRemoveFromCart}
                icon={<Minus className="h-[20px] w-[20px]" />}
                className="flex w-[256px] rounded-full"
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
              >
                Add to Cart
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailContent;
