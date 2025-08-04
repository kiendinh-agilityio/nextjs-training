import Image from 'next/image';

// import components
import { Heading } from '@/components/common/ui/heading';

// import constants
import { PROMOTIONS_DATA } from '@/constants/home-data';

// import lib
import { cn } from '@/lib/utils';

const PromotionsSection = () => (
  <section className="mb-[23px] mt-[29px] lg:mt-[54px]">
    <Heading size="md" className="mb-[30px] lg:mb-[54px]">
      Up to -40% Discount Offers 🎊
    </Heading>
    <div
      className={cn(
        'scroll-snap-x -mx-4 flex flex-row gap-[14px] overflow-x-auto px-4',
        '[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
        'lg:justify-between lg:overflow-hidden',
      )}
    >
      {PROMOTIONS_DATA.map((promo) => (
        <div
          key={promo.id}
          className={cn(
            'scroll-snap-start flex flex-shrink-0 flex-col items-start',
            'w-[150px] min-w-[150px] md:w-[225px] lg:w-[325px] xl:w-[400px] 2xl:w-[496px]',
            'lg:relative',
          )}
        >
          <ul className="relative w-full overflow-hidden rounded-[12px] shadow-md">
            <li>
              <Image
                src={promo.image}
                alt={promo.name}
                width={496}
                height={325}
                sizes="(max-width: 1024px) 150px, 325px"
                className="h-[150px] w-full object-cover lg:h-[325px]"
                priority={true}
              />
            </li>
            <li
              className={cn(
                'absolute right-0 top-0 bg-secondary font-bold text-white',
                'mr-[16px] rounded-bl-[4px] rounded-br-[4px] px-[5px] py-[8px] text-[15px]',
                'lg:mr-[24px] lg:px-[17px] lg:pb-[18px] lg:pt-[21px] lg:text-[18px] lg:leading-[18px]',
              )}
            >
              -{promo.discount}%
            </li>
          </ul>
          <div
            className={cn(
              'mt-[10px] text-[13px] font-bold leading-[17px]',
              'lg:absolute lg:bottom-0 lg:px-[36px] lg:py-[46px] lg:text-[24px] lg:leading-[24px]',
            )}
          >
            <p className={cn('mb-[2px] text-primary lg:mb-[6px]')}>
              {promo.type}
            </p>
            <p className={cn('text-secondary lg:text-white')}>{promo.name}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default PromotionsSection;
