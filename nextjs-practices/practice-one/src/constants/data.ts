import { TimeSlot, ContactInfo } from '@/types/common';

export const PROMOTIONS_DATA = [
  {
    id: 1,
    name: 'Chef Burgers London',
    type: 'Restaurant',
    discount: 40,
    image: '/images/promotions-image-one.webp',
  },
  {
    id: 2,
    name: 'Grand Ai Cafe London',
    type: 'Restaurant',
    discount: 20,
    image: '/images/promotions-image-two.webp',
  },
  {
    id: 3,
    name: "Butterbrot Caf'e London",
    type: 'Restaurant',
    discount: 17,
    image: '/images/promotions-image-one.webp',
  },
];

export const POPULAR_CATEGORIES_DATA = [
  {
    name: 'Burgers & Fast food',
    count: 21,
    image: '/images/burgers-fast.webp',
  },
  {
    name: 'Salads',
    count: 32,
    image: '/images/salads.webp',
  },
  {
    name: 'Pasta & Casuals',
    count: 4,
    image: '/images/pasta-casuals.webp',
  },
  {
    name: 'Pizza',
    count: 32,
    image: '/images/pizza.webp',
  },
  {
    name: 'Breakfast',
    count: 4,
    image: '/images/breakfast.webp',
  },
  {
    name: 'Soups',
    count: 32,
    image: '/images/soups.webp',
  },
];

export const POPULAR_RESTAURANTS_DATA = [
  {
    name: "McDonald's London",
    image: '/images/mcdonald.webp',
  },
  {
    name: 'Papa Johns',
    image: '/images/papa-johns.webp',
  },
  {
    name: 'KFC West London',
    image: '/images/kfc.webp',
  },
  {
    name: 'Texas Chicken',
    image: '/images/texas-chicken.webp',
  },
  {
    name: 'Burger King',
    image: '/images/burger-king.webp',
  },
  {
    name: 'Shaurma 1',
    image: '/images/shaurma.webp',
  },
];

export const TIMES: TimeSlot[] = [
  {
    day: 'Monday',
    delivery: '12:00 AM–3:00 AM, 8:00 AM–3:00 AM',
    operational: '8:00 AM–3:00 AM',
  },
  {
    day: 'Tuesday',
    delivery: '8:00 AM–3:00 AM',
    operational: '8:00 AM–3:00 AM',
  },
  {
    day: 'Wednesday',
    delivery: '8:00 AM–3:00 AM',
    operational: '8:00 AM–3:00 AM',
  },
  {
    day: 'Thursday',
    delivery: '8:00 AM–3:00 AM',
    operational: '8:00 AM–3:00 AM',
  },
  {
    day: 'Friday',
    delivery: '8:00 AM–3:00 AM',
    operational: '8:00 AM–3:00 AM',
  },
  {
    day: 'Saturday',
    delivery: '8:00 AM–3:00 AM',
    operational: '8:00 AM–3:00 AM',
  },
  {
    day: 'Sunday',
    delivery: '8:00 AM–12:00 AM',
    operational: '8:00 AM–3:00 AM',
  },
];

export const CONTACT_INFO: ContactInfo[] = [
  {
    title: 'Phone number',
    value: '+934443-43',
  },
  {
    title: 'Website',
    value: 'http://mcdonalds.uk/',
  },
];

export const CATEGORIES_ITEM = [
  'Offers',
  'Burgers',
  'Fries',
  'Snacks',
  'Salads',
  'Cold drinks',
  'Desserts',
  'Hot drinks',
  'Sauces',
];
