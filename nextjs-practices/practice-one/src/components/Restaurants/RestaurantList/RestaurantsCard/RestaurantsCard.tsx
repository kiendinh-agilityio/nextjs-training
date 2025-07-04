import Image from 'next/image';
import { Card } from '@/components/common/ui/card';
import type { Product } from '@/types/product';

const RestaurantsCard = ({ name, description, price, image }: Product) => (
  <Card className="flex py-[24px] px-[30px] bg-[#fdfdfd] gap-[18px] rounded-[12px] border border-black/10 shadow-[5px_5px_34px_0_rgba(0,0,0,0.25)] 2xl:w-[496px]">
    <div className="flex-1 text-black">
      <p className="text-xl leading-[23px] font-semiBold mb-[24px]">{name}</p>
      <p className="font-base text-sm leading-[25px] mb-[15px]">
        {description}
      </p>
      <p className="font-bold text-lg leading-[18px]">GDP {price}</p>
    </div>
    <div className="relative w-40 h-40 flex-shrink-0">
      <Image src={image} alt={name} fill className="object-cover rounded-xl" />
      <div className="absolute bottom-2 right-2 bg-white/70 rounded-full p-2 shadow">
        <span className="block w-6 h-6 text-2xl text-black flex items-center justify-center">
          +
        </span>
      </div>
    </div>
  </Card>
);

export default RestaurantsCard;
