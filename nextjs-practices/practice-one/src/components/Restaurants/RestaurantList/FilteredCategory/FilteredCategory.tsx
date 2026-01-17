import RestaurantsCategoryList from '../RestaurantsCategoryList/RestaurantsCategoryList';

export interface FilteredCategoryProps {
  category?: string;
}

const FilteredCategory = ({ category }: FilteredCategoryProps) => {
  if (!category || category === 'Offers') return null;

  return (
    <section className="container mx-auto flex flex-col gap-32 sm:px-0">
      <RestaurantsCategoryList key={category} category={category} />
    </section>
  );
};

export default FilteredCategory;
