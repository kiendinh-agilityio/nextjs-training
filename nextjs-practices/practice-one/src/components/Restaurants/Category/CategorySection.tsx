'use client';

import Link from 'next/link';

// import nextjs hooks
import { useSearchParams } from 'next/navigation';

// import constants
import { CATEGORIES_ITEM } from '@/constants/restaurants-data';

// import lib
import { cn } from '@/lib/utils';

// import function utils
import { getCategoryHref } from '@/utils/getCategoryHref';

const CategorySection = () => {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get('category') ?? 'Offers';

  return (
    <section
      className={cn(
        'mb-12 flex w-full items-center justify-center bg-primary py-6 lg:mb-[71px]',
      )}
    >
      <div
        className={cn(
          'flex w-full gap-8 px-4 2xl:justify-center',
          'overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] 2xl:overflow-x-visible [&::-webkit-scrollbar]:hidden',
        )}
      >
        {CATEGORIES_ITEM.map((category) => (
          <Link
            key={category}
            href={getCategoryHref(category)}
            className={cn(
              'flex-shrink-0 rounded-full px-8 py-2 text-lg font-bold transition-colors duration-200 focus:outline-none',
              activeCategory === category
                ? 'bg-[#0a0a16] text-white'
                : 'bg-transparent text-white',
            )}
          >
            {category}
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
