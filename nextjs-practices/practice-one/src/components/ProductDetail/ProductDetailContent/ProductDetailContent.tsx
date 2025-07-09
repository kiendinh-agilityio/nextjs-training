import Image from 'next/image';
import { Product } from '@/types/product';
import { Heading } from '@/components/common/ui/heading';
import { ProductRating } from '@/components/ProductDetail';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
} from '@/components/common/ui/breadcrumb';
import { cn } from '@/lib/utils';

interface ProductDetailContentProps {
  product: Product;
}

const ProductDetailContent = ({ product }: ProductDetailContentProps) => (
  <section>
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/restaurant">Restaurants</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbPage>{product.name}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
    <div className={cn('flex flex-col md:flex-row gap-8 mt-20')}>
      <Image
        src={product.image}
        alt={product.name}
        width={400}
        height={400}
        className={cn(
          'flex-1 rounded-xl flex justify-center items-center object-contain',
        )}
      />
      <div className={cn('flex-1 font-regular text-gray-700')}>
        <Heading size="md">{product.name}</Heading>
        <ProductRating
          rating={parseFloat(product.rating?.replace('rating ', '') ?? '0')}
        />
        <p
          className={cn(
            'flex items-center mt-8 mb-4 text-2xl font-bold text-gray-900',
          )}
        >
          GDP {product.price}
        </p>
        <p className={cn('mb-4 text-gray-700')}>{product.description}</p>
        <p className={cn('mb-4')}>
          <span className={cn('font-semibold')}>Category:</span>{' '}
          {product.category}
        </p>
        <div className={cn('mb-4')}>
          <p className={cn('font-semibold')}>Ingredients:</p>
          <ul className={cn('list-disc list-inside mt-2 flex flex-col gap-2')}>
            {product.ingredients?.map((ing) => (
              <li className={cn('font-regular text-sm lg:text-base')} key={ing}>
                {ing}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>
);

export default ProductDetailContent;
