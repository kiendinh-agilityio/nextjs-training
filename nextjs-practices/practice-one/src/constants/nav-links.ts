import { ROUTERS } from '@/constants/router';

export const NAV_LINKS = [
  { label: 'Home', href: ROUTERS.HOME },
  { label: 'Special Offers', href: '/offers', disabled: true },
  { label: 'Restaurants', href: ROUTERS.RESTAURANT },
  { label: 'Track Order', href: '/track-order', disabled: true },
];
