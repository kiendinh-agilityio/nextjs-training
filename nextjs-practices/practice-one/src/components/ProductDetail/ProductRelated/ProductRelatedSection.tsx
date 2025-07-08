import Link from 'next/link';
import Image from 'next/image';

import { cn } from '@/lib/utils';
import { Product } from '@/types/product';
import { Heading } from '@/components/common/ui/heading';
import { getRestaurantList } from '@/actions/product';

interface ProductRelatedSectionProps {
  product: Product;
}

const ProductRelatedSection = async ({
  product,
}: ProductRelatedSectionProps) => {
  if (!product?.category) return null;

  const all = await getRestaurantList(product.category);

  const related = all.filter((p) => p.id !== product.id).slice(0, 4);

  if (!related || related.length === 0) return null;

  return (
    <section className={cn('mt-20')}>
      <Heading size="md" className={cn('text-3xl font-bold text-center mb-12')}>
        RELATED PRODUCTS
      </Heading>
      <div
        className={cn('grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6')}
      >
        {related.map((item) => (
          <Link
            key={item.id}
            href={`/product-detail/${item.id}`}
            className={cn(
              'border rounded-xl p-6 flex flex-col items-center text-center hover:shadow-lg transition justify-end',
            )}
          >
            <Image
              src={item.image}
              alt={item.name}
              width={150}
              height={80}
              className={cn('mb-4')}
            />
            <p
              className={cn(
                'font-semibold text-xs md:min-h-[40px] lg:min-h-[48px] lg:text-base mb-2',
              )}
            >
              {item.name}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ProductRelatedSection;
