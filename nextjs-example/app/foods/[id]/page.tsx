import { getFoodById } from "../actions/food-actions";
import { FoodDetail } from "../components/food-detail";

interface FoodDetailPageProps {
  params: {
    id: string;
  };
}

const FoodDetailPage = async ({ params }: FoodDetailPageProps) => {
  const food = await getFoodById(params.id);

  return (
    <div className="container mx-auto py-8">
      <FoodDetail food={food} />
    </div>
  );
};

export default FoodDetailPage;
