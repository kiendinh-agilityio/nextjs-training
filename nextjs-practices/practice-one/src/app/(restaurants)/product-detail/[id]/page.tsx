import { getProductDetail, getRestaurantList } from '@/actions/product';
import { Product } from '@/types/product';
import {
  ProductRelatedSection,
  ProductDetailContent,
} from '@/components/ProductDetail';
import { createMetadata } from '@/utils/metadata';
import { BASE_URL } from '@/constants/url';
import { ROUTERS } from '@/constants/router';

export const metadata = createMetadata({
  title: 'Product Detail Page',
  description:
    'Explore detailed product information, mouth-watering dishes, and exclusive offers on Order.uk. Check ingredients, reviews, and order your favorite meal today',
  keywords: ['restaurant', 'products detail', 'Order.uk'],
  url: `${BASE_URL}${ROUTERS.PRODUCT_DETAIL}`,
  imageAlt: 'Order.uk Product Detail',
});

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

const ProductDetailPage = async ({ params }: ProductDetailPageProps) => {
  const { id } = await params;
  const product = (await getProductDetail(id)) as Product;

  if (!product) return <div>Product not found</div>;

  const all = await getRestaurantList(product.category);
  const related = all.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className="container mx-auto py-8 lg:px-0">
      <ProductDetailContent product={product} />
      <ProductRelatedSection relatedProducts={related} />
    </div>
  );
};

export default ProductDetailPage;
