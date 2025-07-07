import { render } from '@testing-library/react';
import RestaurantsCategoryList from './RestaurantsCategoryList';
import type { Product } from '@/types/product';

describe('RestaurantsCategoryList', () => {
  it('should match snapshot', () => {
    const mockProducts: Product[] = [
      {
        id: '1',
        name: 'Pizza',
        description: 'Delicious pizza',
        price: '10',
        image: '/pizza.jpg',
        category: 'Pizza',
      },
      {
        id: '2',
        name: 'Burger',
        description: 'Juicy burger',
        price: '8',
        image: '/burger.jpg',
        category: 'Fast Food',
      },
    ];
    const { asFragment } = render(
      <RestaurantsCategoryList category="Fast Food" products={mockProducts} />,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
