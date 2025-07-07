import Image from 'next/image';
import { Heading } from '@/components/common/ui/heading';
import { POPULAR_RESTAURANTS_DATA } from '@/constants/home-data';
import { cn } from '@/lib/utils';

const PopularRestaurantsSection = () => (
  <section className={cn('mt-[29px] lg:mt-[56px]')}>
    <Heading size="md">Popular Restaurants</Heading>
    <div
      className={cn(
        '-mx-4 px-4 mt-4 overflow-x-auto scroll-snap-x [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden lg:overflow-hidden lg:mt-[51px]',
      )}
    >
      <div className={cn('flex gap-[10px] lg:justify-between')}>
        {POPULAR_RESTAURANTS_DATA.map((restaurant) => (
          <div
            key={restaurant.name}
            className={cn(
              'flex flex-col items-center rounded-[12px] shadow-md min-w-[122px] w-[122px] h-[156px] md:w-[160px] lg:w-[200px] lg:h-[266px] overflow-hidden border-primary 2xl:w-[238px]',
            )}
          >
            <Image
              src={restaurant.image}
              alt={restaurant.name}
              width={238}
              height={203}
              sizes="(max-width: 1023px) 121px, 160px, 238px"
              className={cn(
                'w-[122px] h-[103px] md:w-[160px] lg:h-[203px] lg:w-[200px] 2xl:w-[238px] object-cover',
              )}
            />
            <p
              className={cn(
                'w-full bg-primary text-white text-center py-[10px] px-[14px] text-[13px] leading-[16px] font-bold h-[52px] lg:text-[18px] lg:[leading-18px] lg:px-[28px] lg:py-[18px] lg:h-[63px]',
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
