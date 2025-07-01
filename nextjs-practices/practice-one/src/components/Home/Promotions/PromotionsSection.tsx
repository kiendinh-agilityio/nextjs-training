import { PROMOTIONS_DATA } from '@/constants/data';

const PromotionsSection = () => {
  return (
    <section className="mt-[29px] mb-[23px] lg:mt-[54px]">
      <h2 className="text-xl font-bold mb-4">Up to -40% Discount Offers 🎊</h2>
      <div className="-mx-4 px-4 flex flex-row gap-[14px] overflow-x-auto scrollbar-hide scroll-snap-x lg:overflow-hidden lg:justify-between">
        {PROMOTIONS_DATA.map((promo) => (
          <div
            key={promo.id}
            className="flex flex-col items-start min-w-[150px] w-[150px] flex-shrink-0 scroll-snap-start lg:w-[400px] 2xl:w-[496px] lg:relative"
          >
            <ul className="relative rounded-[12px] overflow-hidden shadow-md w-full">
              <li>
                <img
                  src={promo.image}
                  alt={promo.name}
                  className="w-full h-[150px] lg:h-[325px] object-cover"
                />
              </li>
              <li className="absolute top-0 right-3 bg-[#111827] text-white text-[15px] font-bold px-[5px] py-[8px] rounded-bl-[4px] rounded-br-[4px] lg:text-[18px] lg:leading-[18px] lg:px-[17px] lg:pt-[21px] lg:pb-[18px]">
                -{promo.discount}%
              </li>
            </ul>
            <div className="font-bold text-[13px] leading-[17px] mt-[10px] lg:text-[24px] lg:leading-[24px] lg:absolute lg:bottom-0 lg:px-[36px] lg:py-[46px]">
              <p className="text-primary mb-[2px] mb-[6px]">{promo.type}</p>
              <p className="text-secondary lg:text-white">{promo.name}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PromotionsSection;
