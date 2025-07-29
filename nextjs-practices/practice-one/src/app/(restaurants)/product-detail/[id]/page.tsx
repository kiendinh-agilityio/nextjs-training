import { getProductDetail, getRestaurantList } from '@/actions/product';
import {
  ProductRelatedSection,
  ProductDetailContent,
} from '@/components/ProductDetail';
import { createMetadata } from '@/utils/metadata';
import { getRelatedProducts } from '@/utils/getRelatedProducts';
import { BASE_URL } from '@/constants/url';
import { ROUTERS } from '@/constants/router';
import { notFound } from 'next/navigation';

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export const generateMetadata = async ({ params }: ProductDetailPageProps) => {
  const { id } = await params;
  const product = await getProductDetail(id);

  if (!product) {
    notFound();
  }

  return createMetadata({
    title: product.name,
    description: product.description,
    url: `${BASE_URL}${ROUTERS.PRODUCT_DETAIL}/${product.id}`,
    image: product.image,
    imageAlt: product.name,
    keywords: [product.name, 'restaurant', 'Order.uk'],
  });
};

const ProductDetailPage = async ({ params }: ProductDetailPageProps) => {
  const { id } = await params;
  const product = await getProductDetail(id);

  if (!product) {
    notFound();
  }

  const categoryProducts = await getRestaurantList(product.category);

  return (
    <div className="container mx-auto py-8 lg:px-0">
      <ProductDetailContent product={product} />
      <ProductRelatedSection
        relatedProducts={getRelatedProducts(
          categoryProducts,
          product.id.toString(),
        )}
      />
    </div>
  );
};

export default ProductDetailPage;
