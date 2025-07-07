import RestaurantsCategoryList from './RestaurantsCategoryList/RestaurantsCategoryList';
import { Product } from '@/types/product';
import { getRestaurantList } from '@/actions/product';

// Accept category as a prop
interface RestaurantListSectionProps {
  category?: string;
}

const RestaurantListSection = async ({
  category,
}: RestaurantListSectionProps) => {
  // Treat 'Offers' as no filter (fetch all products)
  const isAll = !category || category === 'Offers';
  const data = await getRestaurantList(isAll ? undefined : category);

  // If a category is selected and not 'Offers', show only that category
  if (category && category !== 'Offers') {
    return (
      <section className="container mx-auto sm:px-0 flex flex-col gap-32">
        <RestaurantsCategoryList
          key={category}
          category={category}
          products={data}
        />
      </section>
    );
  }

  // Otherwise, group products by category
  const categories: [string, Product[]][] = Array.from(
    data.reduce((map: Map<string, Product[]>, item) => {
      if (!map.has(item.category)) map.set(item.category, []);
      map.get(item.category)!.push(item);
      return map;
    }, new Map()),
  );

  return (
    <section className="container mx-auto sm:px-0 flex flex-col gap-32">
      {categories.map(([category, products]) => (
        <RestaurantsCategoryList
          key={category}
          category={category}
          products={products}
        />
      ))}
    </section>
  );
};

export default RestaurantListSection;
