'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { CATEGORIES_ITEM } from '@/constants/restaurants-data';
import { cn } from '@/lib/utils';

const getCategoryHref = (category: string) =>
  category === 'Offers'
    ? '/restaurant'
    : `/restaurant?category=${encodeURIComponent(category)}`;

const CategorySection = () => {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get('category') ?? 'Offers';

  return (
    <section
      className={cn(
        'w-full bg-primary flex justify-center items-center py-6 mb-12 lg:mb-[71px]',
      )}
    >
      <div
        className={cn(
          'flex gap-8 overflow-x-auto w-full px-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden 2xl:justify-center 2xl:overflow-x-visible',
        )}
      >
        {CATEGORIES_ITEM.map((category) => (
          <Link
            key={category}
            href={getCategoryHref(category)}
            className={cn(
              'flex-shrink-0 px-8 py-2 rounded-full font-bold text-lg transition-colors duration-200 focus:outline-none',
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
