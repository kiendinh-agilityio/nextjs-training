import Image from 'next/image';
import { Heading } from '@/components/common/ui/heading';
import { MotoIcon, OrderCompletedIcon } from '@/components/Icons';

const HeroSection = () => (
  <section className="flex flex-col justify-center items-center text-white bg-hero-restaurant bg-cover bg-center w-full 2xl:w-[1528px] 2xl:mx-auto">
    <div className="container flex flex-col-reverse pt-[48px] pb-[49px] sm:px-0 lg:gap-[81px] lg:flex-row lg:pt-[57px] lg:pb-[51px] lg:justify-between xl:px-[57px]">
      <article className="flex flex-col justify-center text-center mt-[34px] lg:mt-0 lg:text-left">
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        <p className="font-base text-[20px] leading-[66px]">I'm lovin' it!</p>
        <Heading as="h1" size="xl">
          McDonald’s East London
        </Heading>
        <ul className="flex flex-col gap-[15px] mt-7 px-[34px] font-semiBold text-[16px] leading-[66px] lg:px-0 xl:flex-row">
          <li className="flex items-center justify-center gap-[17px] border border-white text-white px-[33px] rounded-[120px]">
            <OrderCompletedIcon /> Minimum Order: 12 GBP
          </li>
          <li className="flex items-center justify-center gap-[17px] border border-white text-white px-[33px] rounded-[120px]">
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
        className="mx-auto w-[250px] h-[145px] md:w-[400px] md:h-[230px] 2xl:w-[637px] 2xl:h-[369px] lg:mx-0"
        priority
      />
    </div>
  </section>
);

export default HeroSection;
