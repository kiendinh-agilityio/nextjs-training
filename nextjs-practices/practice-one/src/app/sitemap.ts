import { MetadataRoute } from 'next';
import { ROUTERS } from '@/constants/router';

export const sitemap = (): MetadataRoute.Sitemap => {
  return [
    {
      url: `${process.env.BASE_URL}${ROUTERS.HOME}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${process.env.BASE_URL}${ROUTERS.LOGIN}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${process.env.BASE_URL}${ROUTERS.RESTAURANT}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${process.env.BASE_URL}${ROUTERS.PRODUCT_DETAIL}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ];
};

export default sitemap;
