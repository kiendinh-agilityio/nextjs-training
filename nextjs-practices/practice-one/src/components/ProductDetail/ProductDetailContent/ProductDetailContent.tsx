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
    <div className="mt-20 flex flex-col gap-8 md:flex-row">
      <Image
        src={product.image}
        alt={product.name}
        width={400}
        height={400}
        className="flex flex-1 items-center justify-center rounded-xl object-none"
      />
      <div className="font-regular flex-1 text-gray-700">
        <Heading size="md">{product.name}</Heading>
        <ProductRating
          rating={parseFloat(product.rating?.replace('rating ', '') ?? '0')}
        />
        <p className="mb-4 mt-8 flex items-center text-2xl font-bold text-gray-900">
          GDP {product.price}
        </p>
        <p className="mb-4 text-gray-700">{product.description}</p>
        <p className="mb-4">
          <span className="font-semibold">Category:</span> {product.category}
        </p>
        <div className="mb-4">
          <p className="font-semibold">Ingredients:</p>
          <ul className="mt-2 flex list-inside list-disc flex-col gap-2">
            {product.ingredients?.map((ing) => (
              <li className="font-regular text-sm lg:text-base" key={ing}>
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
