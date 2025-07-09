import Image from 'next/image';
import { Heading } from '@/components/common/ui/heading';
import { POPULAR_CATEGORIES_DATA } from '@/constants/home-data';
import { cn } from '@/lib/utils';

const PopularCategoriesSection = () => (
  <section className="mt-[51px]">
    <Heading size="md">Up to -40% Discount Offers 🎊</Heading>
    <div
      className={cn(
        'mt-[29px] grid grid-cols-2 gap-[20px] rounded-[12px] border border-base',
        'lg:mt-[51px] lg:grid-cols-3 2xl:grid-cols-6',
      )}
    >
      {POPULAR_CATEGORIES_DATA.map((cat) => (
        <div key={cat.name} className="flex flex-col items-center">
          <Image
            src={cat.image}
            alt={cat.name}
            width={238}
            height={203}
            sizes="(max-width: 1023px) 189px, 238px"
            className="h-[161px] w-full object-cover md:h-[203px] 2xl:w-[238px]"
          />
          <div
            className={cn(
              'flex w-full flex-col rounded-bl-[12px] rounded-br-[12px] bg-[#f5f5f5] px-[18px] py-[7px] text-[13px] leading-[13px]',
              'leading-[18px] lg:text-[18px]',
            )}
          >
            <p className="font-bold leading-tight text-secondary">{cat.name}</p>
            <p className="mt-[2px] text-[13px] text-primary lg:mt-[4px]">
              {cat.count} Restaurants
            </p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default PopularCategoriesSection;
