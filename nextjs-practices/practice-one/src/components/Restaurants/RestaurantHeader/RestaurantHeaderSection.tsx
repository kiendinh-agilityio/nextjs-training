import { SearchInput } from '@/components/SearchInput/SearchInput';
import { Heading } from '@/components/common/ui/heading';

const RestaurantHeaderSection = () => (
  <section className="container flex flex-col items-center justify-between text-center py-8 px-4 md:px-12 lg:text-left lg:flex-row">
    <Heading size="md" className="mb-8 lg:mb-0">
      All Offers from McDonald’s East London
    </Heading>
    <div className="w-full lg:max-w-[344px]">
      <SearchInput />
    </div>
  </section>
);

export default RestaurantHeaderSection;
