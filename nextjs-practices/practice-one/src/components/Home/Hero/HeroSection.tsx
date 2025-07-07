import { Heading } from '@/components/common/ui/heading';
import { ArrowRightIcon } from '@/components/Icons/ArrowNextIcon';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const HeroSection = () => (
  <section
    className={cn(
      'relative border border-base rounded-xl flex flex-col text-center mt-[47px] bg-[#e2e2e2] text-secondary px-[38px] pt-[10px] pb-[43px]',
      'lg:flex-row lg:text-left xl:px-[57px] lg:pt-[134px] lg:pb-[162px] lg:bg-[#fbfbfb] lg:border-sm',
    )}
  >
    <div className={cn('lg:w-[calc(1024px-600px)] xl:w-[calc(1528px-1000px)]')}>
      <p className={cn('text-[12px] leading-[66px] lg:text-[16px]')}>
        Order Restaurant food, takeaway and groceries.
      </p>
      <Heading as="h1" size="xl">
        Feast Your Senses,{' '}
        <span className={cn('text-primary')}>Fast and Fresh</span>
      </Heading>
      <p className={cn('text-[12px] leading-[66px]')}>
        Enter a postcode to see what we deliver
      </p>
      <div
        className={cn(
          'relative rounded-[120px] h-[57px] bg-white flex items-center shadow-md xl:w-[373px]',
        )}
      >
        <input
          type="text"
          placeholder="e.g. EC4R 3TE"
          className={cn(
            'bg-transparent outline-none border-none text-[15px] placeholder:text-[15px] placeholder:leading-[66px] placeholder:text-black placeholder:opacity-80 px-[30px] py-[6px]',
          )}
        />
        <button
          className={cn(
            'absolute right-0 ml-4 flex items-center justify-center w-[57px] h-[57px] rounded-full bg-primary shadow cursor-not-allowed xl:hidden',
          )}
          aria-label="Search postcode"
        >
          <ArrowRightIcon />
        </button>
        <button
          className={cn(
            'hidden absolute right-0 ml-4 xl:flex items-center justify-center w-[188px] h-[57px] rounded-full bg-primary shadow cursor-not-allowed text-white text-base',
          )}
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
      className={cn(
        'hidden lg:block lg:absolute right-0 lg:w-[600px] xl:w-[850px] 2xl:bottom-0 2xl:w-[1205px]',
      )}
      priority
    />
  </section>
);

export default HeroSection;
