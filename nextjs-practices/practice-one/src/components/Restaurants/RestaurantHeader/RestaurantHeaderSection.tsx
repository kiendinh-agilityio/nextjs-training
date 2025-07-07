import { SearchInput } from '@/components/SearchInput/SearchInput';
import { Heading } from '@/components/common/ui/heading';
import { cn } from '@/lib/utils';

const RestaurantHeaderSection = () => (
  <section
    className={cn(
      'container flex flex-col items-center justify-between text-center py-8 px-4 md:px-12 lg:text-left lg:flex-row',
    )}
  >
    <Heading size="md" className={cn('mb-8 lg:mb-0')}>
      All Offers from McDonald’s East London
    </Heading>
    <div className={cn('w-full lg:max-w-[344px]')}>
      <SearchInput />
    </div>
  </section>
);

export default RestaurantHeaderSection;
