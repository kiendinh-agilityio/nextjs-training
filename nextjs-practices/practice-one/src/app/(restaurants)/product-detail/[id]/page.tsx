import { getProductDetail, getRestaurantList } from '@/actions/product';
import { Product } from '@/types/product';
import {
  ProductRelatedSection,
  ProductDetailContent,
} from '@/components/ProductDetail';
import { createMetadata } from '@/utils/metadata';
import { BASE_URL } from '@/constants/url';
import { ROUTERS } from '@/constants/router';

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export const generateMetadata = async ({ params }: ProductDetailPageProps) => {
  const { id } = await params;
  const product = (await getProductDetail(id)) as Product;

  if (!product) {
    return createMetadata({
      title: 'Product Not Found',
      description: 'This product does not exist.',
      url: `${BASE_URL}${ROUTERS.PRODUCT_DETAIL}/${id}`,
      imageAlt: 'Product Not Found',
    });
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
