import { getProductDetail } from '@/actions/product';
import { Product } from '@/types/product';
import {
  ProductRelatedSection,
  ProductDetailContent,
} from '@/components/ProductDetail';

interface ProductDetailPageProps {
  params: Promise<{ id: string }> | { id: string };
}

const ProductDetailPage = async ({ params }: ProductDetailPageProps) => {
  const { id } = await params;
  const product = (await getProductDetail(id)) as Product;

  if (!product) return <div>Product not found</div>;

  return (
    <div className="container mx-auto py-8 lg:px-0">
      <ProductDetailContent product={product} />
      <ProductRelatedSection product={product} />
    </div>
  );
};

export default ProductDetailPage;
