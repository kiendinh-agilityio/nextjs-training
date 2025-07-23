import { MetadataRoute } from 'next';

export const createEntry = (
  url: string,
  priority: number,
  changeFrequency: MetadataRoute.Sitemap[0]['changeFrequency'] = 'weekly',
) => {
  return {
    url,
    lastModified: new Date(),
    changeFrequency,
    priority,
  };
};
