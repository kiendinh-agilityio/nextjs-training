import Image from 'next/image';
import { Heading } from '@/components/common/ui/heading';
import { MotoIcon, OrderCompletedIcon } from '@/components/Icons';
import { cn } from '@/lib/utils';

const HeroSection = () => (
  <section
    className={cn(
      'flex flex-col items-center justify-center',
      'w-full 2xl:mx-auto 2xl:w-[1528px]',
      'bg-hero-restaurant bg-cover bg-center text-white',
    )}
  >
    <div
      className={cn(
        'container flex flex-col-reverse',
        'pb-[49px] pt-[48px] sm:px-0',
        'lg:flex-row lg:justify-between lg:gap-[65px] lg:pb-[51px] lg:pt-[57px] 2xl:gap-[81px]',
        'xl:px-[57px]',
      )}
    >
      <article className="mt-[34px] flex flex-col justify-center text-center lg:mt-0 lg:text-left">
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        <p className="font-base text-[20px] leading-[66px]">I’m lovin’ it!</p>
        <Heading as="h1" size="xl">
          McDonald’s East London
        </Heading>
        <ul
          className={cn(
            'mt-7 flex flex-col gap-[15px] px-[34px]',
            'lg:px-0 xl:flex-row',
            'text-xs font-semiBold leading-[66px] md:text-[18px]',
          )}
        >
          <li className="flex items-center justify-center gap-[17px] rounded-[120px] border border-white px-[33px] text-white">
            <OrderCompletedIcon /> Minimum Order: 12 GBP
          </li>
          <li className="flex items-center justify-center gap-[17px] rounded-[120px] border border-white px-[33px] text-white">
            <MotoIcon />
            Delivery in 20-25 Minutes
          </li>
        </ul>
      </article>
      <Image
        src="/images/hero-restaurant.webp"
        alt="Hero Restaurant"
        width={637}
        height={369}
        sizes="(min-width: 1728px) 637px, (max-width: 767px) 250px, 100vw"
        className={cn(
          'mx-auto',
          'h-[145px] w-[250px] md:h-[230px] md:w-[400px] 2xl:h-[369px] 2xl:w-[637px]',
          'lg:mx-0',
        )}
        priority
      />
    </div>
  </section>
);

export default HeroSection;
