import { Suspense } from "react";
import { getFoods } from "./actions/food-actions";
import { CartDialog } from "./components/cart-dialog";
import { FoodsList } from "./components/foods-list";

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
      <FoodsList initialFoods={foods} />
    </div>
  );
};
export default FoodsPage;
