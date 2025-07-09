import Link from 'next/link';
import Image from 'next/image';

import { cn } from '@/lib/utils';
import { Product } from '@/types/product';
import { Heading } from '@/components/common/ui/heading';

interface ProductRelatedSectionProps {
  relatedProducts: Product[];
}

const ProductRelatedSection = ({
  relatedProducts,
}: ProductRelatedSectionProps) => {
  if (!relatedProducts || relatedProducts.length === 0) return null;

  return (
    <section className="mt-20">
      <Heading size="md" className="mb-12 text-center text-3xl font-bold">
        RELATED PRODUCTS
      </Heading>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
        {relatedProducts.map((item) => (
          <Link
            key={item.id}
            href={`/product-detail/${item.id}`}
            className={cn(
              'flex flex-col items-center justify-end text-center transition hover:shadow-lg',
              'rounded-xl border p-6',
            )}
          >
            <Image
              src={item.image}
              alt={item.name}
              width={150}
              height={80}
              className="mb-4"
            />
            <p className="mb-2 text-xs font-semibold md:min-h-[40px] lg:min-h-[48px] lg:text-base">
              {item.name}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ProductRelatedSection;
