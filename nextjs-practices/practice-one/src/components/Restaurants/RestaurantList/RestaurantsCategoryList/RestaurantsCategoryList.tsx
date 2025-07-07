import { Heading } from '@/components/common/ui/heading';
import RestaurantsCard from '../RestaurantsCard/RestaurantsCard';
import { Product } from '@/types/product';

interface RestaurantsCategorySectionProps {
  category: string;
  products: Product[];
}

const RestaurantsCategoryList = ({
  category,
  products,
}: RestaurantsCategorySectionProps) => (
  <div>
    <Heading size="lg" className="text-primary mb-[40px]">
      {category}
    </Heading>
    <div className="grid grid-cols-1 gap-[20px] lg:grid-cols-2 2xl:grid-cols-3">
      {products.slice(0, 6).map((product) => (
        <RestaurantsCard
          key={product.name + product.id}
          id={product.id}
          name={product.name}
          description={product.description}
          price={product.price}
          image={product.image}
          category={product.category}
        />
      ))}
    </div>
  </div>
);

export default RestaurantsCategoryList;
