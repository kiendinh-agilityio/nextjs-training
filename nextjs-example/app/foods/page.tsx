import { Suspense } from "react";
import { getFoods } from "./actions/food-actions";
import { FoodCard } from "./components/food-card";
import { CartDialog } from "./components/cart-dialog";

const FoodsPage = async () => {
  const foods = await getFoods();

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Our Menu</h1>
        <Suspense fallback={<div>Loading cart icon...</div>}>
          <CartDialog />
        </Suspense>
      </div>
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
    </div>
  );
};

export default FoodsPage;
