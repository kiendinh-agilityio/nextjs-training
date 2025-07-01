import Image from 'next/image';
import { Heading } from '@/components/common/ui/heading';
import { POPULAR_CATEGORIES_DATA } from '@/constants/data';

const PopularCategoriesSection = () => (
  <section className="mt-[51px]">
    <Heading size="md">Up to -40% Discount Offers 🎊</Heading>
    <div className="border border-base grid grid-cols-2 gap-[20px] mt-[29px] rounded-[12px] lg:grid-cols-3 2xl:grid-cols-6 lg:mt-[51px]">
      {POPULAR_CATEGORIES_DATA.map((cat) => (
        <div key={cat.name} className="flex flex-col items-center">
          <Image
            src={cat.image}
            alt={cat.name}
            width={238}
            height={203}
            sizes="(max-width: 1023px) 189px, 238px"
            className="w-full h-[161px] md:h-[203px] 2xl:w-[238px] object-cover"
          />
          <div className="w-full bg-[#f5f5f5] py-[7px] px-[18px] flex flex-col text-[13px] leading-[13px] lg:text-[18px] leading-[18px] rounded-bl-[12px] rounded-br-[12px]">
            <p className="font-bold text-secondary leading-tight">{cat.name}</p>
            <p className="text-primary mt-[2px] text-[13px] lg:mt-[4px]">
              {cat.count} Restaurants
            </p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default PopularCategoriesSection;
