import { MetadataRoute } from 'next';
import { ROUTERS } from '@/constants/router';

export const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: '*',
    allow: [
      ROUTERS.LOGIN,
      ROUTERS.HOME,
      ROUTERS.RESTAURANT,
      ROUTERS.PRODUCT_DETAIL,
    ],
    disallow: [ROUTERS.CART, ROUTERS.PROFILE],
  },
  sitemap: `${process.env.BASE_URL}/sitemap.xml`,
});

export default robots;
