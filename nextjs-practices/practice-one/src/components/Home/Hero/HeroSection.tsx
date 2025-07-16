import { Heading } from '@/components/common/ui/heading';
import { ArrowRightIcon } from '@/components/Icons/ArrowNextIcon';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const HeroSection = () => (
  <section
    className={cn(
      'relative mt-[47px] flex flex-col rounded-xl border border-base bg-[#e2e2e2] px-[38px] pb-[43px] pt-[10px] text-center text-secondary',
      'lg:flex-row lg:border-sm lg:bg-[#fbfbfb] lg:pb-[162px] lg:pt-[134px] lg:text-left xl:px-[57px]',
    )}
  >
    <div className={cn('lg:w-[calc(1024px-600px)] xl:w-[calc(1528px-1000px)]')}>
      <p className="text-[12px] leading-[66px] lg:text-[16px]">
        Order Restaurant food, takeaway and groceries.
      </p>
      <Heading as="h1" size="xl">
        Feast Your Senses, <span className="text-primary">Fast and Fresh</span>
      </Heading>
      <p className="text-[12px] leading-[66px]">
        Enter a postcode to see what we deliver
      </p>
      <div
        className={cn(
          'relative flex h-[57px] items-center rounded-[120px] bg-white shadow-md xl:w-[373px]',
        )}
      >
        <input
          type="text"
          placeholder="e.g. EC4R 3TE"
          className="border-none bg-transparent px-[30px] py-[6px] text-[15px] outline-none placeholder:text-[15px] placeholder:leading-[66px] placeholder:text-black placeholder:opacity-80"
        />
        <button
          className="absolute right-0 ml-4 flex h-[57px] w-[57px] cursor-not-allowed items-center justify-center rounded-full bg-primary shadow xl:hidden"
          aria-label="Search postcode"
        >
          <ArrowRightIcon />
        </button>
        <button
          className="absolute right-0 ml-4 hidden h-[57px] w-[188px] cursor-not-allowed items-center justify-center rounded-full bg-primary text-base text-white shadow xl:flex"
          aria-label="Search postcode"
        >
          Search
        </button>
      </div>
    </div>
    <Image
      src="/images/banner.webp"
      alt="Banner"
      width={1205}
      height={565}
      sizes="(min-width: 1728px) 1205px, (min-width: 1280px) 1000px, (min-width: 1024px) 651px, 100vw"
      className="right-0 hidden lg:absolute lg:block lg:w-[600px] xl:w-[850px] 2xl:bottom-0 2xl:w-[1205px]"
      loading="lazy"
    />
  </section>
);

export default HeroSection;
