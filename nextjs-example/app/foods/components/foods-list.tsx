"use client";

import { Suspense, useEffect, useState, useTransition } from "react";
import { getFoods } from "../actions/food-actions";
import { FoodCard } from "./food-card";
import { CategoryFilter } from "./category-filter";
import { Food, Category } from "../types";

interface FoodsListProps {
  initialFoods: Food[];
}

export const FoodsList = ({ initialFoods }: FoodsListProps) => {
  const [foods, setFoods] = useState<Food[]>(initialFoods);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const uniqueCategories = Array.from(
      new Set(initialFoods.map((food) => food.category))
    ).map((name) => ({ name }));
    setCategories(uniqueCategories);
  }, [initialFoods]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    startTransition(() => {
      getFoods(category).then((data) => {
        setFoods(data);
      });
    });
  };

  return (
    <>
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      {isPending ? (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
          <span className="loader"></span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {foods.map((food) => (
                <Suspense key={food.id} fallback={<div>Loading...</div>}>
                  <FoodCard food={food} />
                </Suspense>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
