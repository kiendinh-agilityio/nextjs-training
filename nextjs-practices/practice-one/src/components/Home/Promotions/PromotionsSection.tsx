import Image from 'next/image';
import { Heading } from '@/components/common/ui/heading';
import { PROMOTIONS_DATA } from '@/constants/data';

const PromotionsSection = () => (
  <section className="mt-[29px] mb-[23px] lg:mt-[54px]">
    <Heading size="md" className="mb-[30px] lg:mb-[54px]">
      Up to -40% Discount Offers 🎊
    </Heading>
    <div className="-mx-4 px-4 flex flex-row gap-[14px] overflow-x-auto scroll-snap-x [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden lg:overflow-hidden lg:justify-between">
      {PROMOTIONS_DATA.map((promo) => (
        <div
          key={promo.id}
          className="flex flex-col items-start min-w-[150px] w-[150px] flex-shrink-0 scroll-snap-start md:w-[225px] lg:w-[325px] xl:w-[400px] 2xl:w-[496px] lg:relative"
        >
          <ul className="relative rounded-[12px] overflow-hidden shadow-md w-full">
            <li>
              <Image
                src={promo.image}
                alt={promo.name}
                width={496}
                height={325}
                sizes="(max-width: 1024px) 150px, 325px"
                className="w-full h-[150px] lg:h-[325px] object-cover"
                priority={true}
              />
            </li>
            <li className="absolute top-0 right-0 mr-[16px] bg-secondary text-white text-[15px] font-bold px-[5px] py-[8px] rounded-bl-[4px] rounded-br-[4px] lg:text-[18px] lg:leading-[18px] lg:px-[17px] lg:pt-[21px] lg:pb-[18px] lg:mr-[24px]">
              -{promo.discount}%
            </li>
          </ul>
          <div className="font-bold text-[13px] leading-[17px] mt-[10px] lg:text-[24px] lg:leading-[24px] lg:absolute lg:bottom-0 lg:px-[36px] lg:py-[46px]">
            <p className="text-primary mb-[2px] lg:mb-[6px]">{promo.type}</p>
            <p className="text-secondary lg:text-white">{promo.name}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default PromotionsSection;
