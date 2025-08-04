import Image from 'next/image';

// import components
import { Heading } from '@/components/common/ui/heading';

// import constants
import { POPULAR_RESTAURANTS_DATA } from '@/constants/home-data';

// import lib
import { cn } from '@/lib/utils';

const PopularRestaurantsSection = () => (
  <section className="mt-[29px] lg:mt-[56px]">
    <Heading size="md">Popular Restaurants</Heading>
    <div
      className={cn(
        'scroll-snap-x -mx-4 mt-4 flex overflow-x-auto px-4',
        '[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
        'lg:mt-[51px] lg:overflow-hidden',
      )}
    >
      <div className="flex w-full gap-[10px] lg:justify-between">
        {POPULAR_RESTAURANTS_DATA.map((restaurant) => (
          <div
            key={restaurant.name}
            className={cn(
              'flex flex-col items-center overflow-hidden',
              'rounded-[12px] border-primary shadow-md',
              'h-[156px] w-[122px] min-w-[122px] md:w-[160px] lg:h-[266px] lg:w-[200px] 2xl:w-[238px]',
            )}
          >
            <Image
              src={restaurant.image}
              alt={restaurant.name}
              width={238}
              height={203}
              sizes="(max-width: 1023px) 121px, 160px, 238px"
              className={cn(
                'object-cover',
                'h-[103px] w-[122px] md:w-[160px] lg:h-[203px] lg:w-[200px] 2xl:w-[238px]',
              )}
            />
            <p
              className={cn(
                'w-full bg-primary text-center font-bold text-white',
                'h-[52px] px-[14px] py-[10px] text-[13px] leading-[16px]',
                'lg:[leading-18px] lg:h-[63px] lg:px-[28px] lg:py-[18px] lg:text-[18px]',
              )}
            >
              {restaurant.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default PopularRestaurantsSection;
