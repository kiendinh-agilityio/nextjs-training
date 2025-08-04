// import components
import { SearchInput } from '@/components/SearchInput/SearchInput';
import { Heading } from '@/components/common/ui/heading';

// import lib
import { cn } from '@/lib/utils';

const RestaurantHeaderSection = () => (
  <section
    className={cn(
      'flex flex-col items-center justify-between text-center',
      'container px-4 py-8 md:px-12',
      'lg:flex-row lg:text-left',
    )}
  >
    <Heading size="md" className="mb-8 lg:mb-0">
      All Offers from McDonald’s East London
    </Heading>
    <div className="w-full lg:max-w-[344px]">
      <SearchInput />
    </div>
  </section>
);

export default RestaurantHeaderSection;
