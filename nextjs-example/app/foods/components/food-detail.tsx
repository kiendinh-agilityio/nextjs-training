"use client";

import { Food } from "../types";
import { useCartStore } from "../store/cart-store";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTransition } from "react";
import Image from "next/image";
import { Minus, Plus } from "lucide-react";

interface FoodDetailProps {
  food: Food;
}

export const FoodDetail = ({ food }: FoodDetailProps) => {
  const [isPending, startTransition] = useTransition();
  const { addItem, removeItem, items } = useCartStore();
  const isInCart = items.some((item) => item.id === food.id);

  return (
    <Card className="w-full max-w-4xl mx-auto flex flex-col md:flex-row">
      <div className="relative w-full md:w-1/2 h-64 md:h-auto">
        <Image
          src={food.image}
          alt={food.name}
          fill
          className="object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
        />
      </div>
      <div className="w-full md:w-1/2 p-6 flex flex-col justify-between">
        <div>
          <CardHeader className="p-0 mb-4">
            <CardTitle className="text-3xl font-bold mb-2">
              {food.name}
            </CardTitle>
            <p className="text-gray-600">{food.category}</p>
          </CardHeader>
          <CardContent className="p-0 text-gray-700 mb-6">
            <p className="mb-4">{food.description}</p>
            <h3 className="font-semibold mb-2">Ingredients:</h3>
            <ul className="list-disc list-inside">
              {food.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
            <h3 className="font-semibold mt-4 mb-2">
              Nutritional Info (per serving):
            </h3>
            <ul className="list-disc list-inside">
              <li>Calories: {food.nutritionalInfo.calories}</li>
              <li>Protein: {food.nutritionalInfo.protein}g</li>
              <li>Carbs: {food.nutritionalInfo.carbs}g</li>
              <li>Fat: {food.nutritionalInfo.fat}g</li>
            </ul>
          </CardContent>
        </div>
        <CardFooter className="p-0 flex justify-between items-center">
          <span className="text-2xl font-bold text-gray-900">
            GBP {food.price.toFixed(2)}
          </span>
          <Button
            className="rounded-full w-12 h-12 p-0 shadow-lg"
            onClick={() =>
              startTransition(() =>
                isInCart ? removeItem(food.id) : addItem(food)
              )
            }
            disabled={isPending}
          >
            {isPending ? (
              <span className="animate-pulse">...</span>
            ) : isInCart ? (
              <Minus className="h-6 w-6" />
            ) : (
              <Plus className="h-6 w-6" />
            )}
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};
