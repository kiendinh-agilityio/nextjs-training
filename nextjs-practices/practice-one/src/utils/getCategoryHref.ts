import { ROUTERS } from '@/constants/router';

export const getCategoryHref = (category: string): string =>
  category === 'Offers'
    ? ROUTERS.RESTAURANT
    : `${ROUTERS.RESTAURANT}?category=${encodeURIComponent(category)}`;
