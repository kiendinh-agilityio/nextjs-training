import { TimeSlot, ContactInfo } from '@/types/common';

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
  'Breakfast',
  'Salads',
  'Cold drinks',
  'Desserts',
  'McCafe',
  'Sauces',
];
