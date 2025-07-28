import { MetadataRoute } from 'next';
import { ROUTERS } from '@/constants/router';
import { CATEGORIES_ITEM } from '@/constants/restaurants-data';
import { BASE_URL } from '@/constants/url';
import { getRestaurantList } from '@/actions/product';
import { createEntry } from '@/utils/createEntry';
import { Product } from '@/types/product';

export const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  let products: Product[] = [];
  try {
    products = await getRestaurantList();
  } catch (e) {
    products = [];
  }
  const categories = CATEGORIES_ITEM.filter((cat) => cat !== 'Offers');

  const staticUrls = [
    createEntry(`${BASE_URL}${ROUTERS.HOME}`, 1),
    createEntry(`${BASE_URL}${ROUTERS.LOGIN}`, 0.8),
    createEntry(`${BASE_URL}${ROUTERS.RESTAURANT}`, 0.8),
  ];

  const categoryUrls = categories.map((category) =>
    createEntry(
      `${BASE_URL}${ROUTERS.RESTAURANT}?category=${encodeURIComponent(category)}`,
      0.6,
    ),
  );

  const productUrls = products.map((product) =>
    createEntry(`${BASE_URL}${ROUTERS.PRODUCT_DETAIL}/${product.id}`, 0.7),
  );

  return [...staticUrls, ...categoryUrls, ...productUrls];
};

export default sitemap;
