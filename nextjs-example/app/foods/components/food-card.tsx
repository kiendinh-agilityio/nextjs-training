'use client';

import { Food } from '../types';
import { useCartStore } from '../store/cart-store';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useTransition } from 'react';
import Image from 'next/image';
import { Minus, Plus } from 'lucide-react';
import { FoodDetailDialog } from './food-detail-dialog';

interface FoodCardProps {
  food: Food;
}

export const FoodCard = ({ food }: FoodCardProps) => {
  const [isPending, startTransition] = useTransition();
  const { addItem, removeItem, items } = useCartStore();
  const isInCart = items.some((item) => item.id === food.id);

  return (
    <FoodDetailDialog food={food}>
      <Card className='relative cursor-pointer flex flex-row-reverse w-full max-w-lg shadow-md rounded-lg overflow-hidden'>
        <div className='relative w-2/5 h-auto'>
          <Image
            src={food.image}
            alt={food.name}
            fill
            className='object-cover rounded-r-lg'
          />
          <Button
            className='absolute bottom-4 right-4 rounded-full w-10 h-10 p-0 shadow-lg z-10'
            onClick={(e) => {
              e.stopPropagation();
              startTransition(() =>
                isInCart ? removeItem(food.id) : addItem(food)
              );
            }}
            disabled={isPending}
          >
            {isPending ? (
              <span className='animate-pulse'>...</span>
            ) : isInCart ? (
              <Minus className='h-5 w-5' />
            ) : (
              <Plus className='h-5 w-5' />
            )}
          </Button>
        </div>
        <div className='w-3/5 p-4 flex flex-col justify-between'>
          <div>
            <CardHeader className='p-0 mb-2'>
              <CardTitle className='text-xl font-bold line-clamp-2'>
                {food.name}
              </CardTitle>
            </CardHeader>
            <CardContent className='p-0 text-sm text-gray-600 line-clamp-3 mb-4'>
              {food.description}
            </CardContent>
          </div>
          <CardFooter className='p-0 flex justify-between items-center'>
            <span className='text-lg font-bold text-gray-900'>
              GBP {food.price.toFixed(2)}
            </span>
          </CardFooter>
        </div>
      </Card>
    </FoodDetailDialog>
  );
};
