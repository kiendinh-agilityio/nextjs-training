import { render } from '@testing-library/react';
import RestaurantsCard from './RestaurantsCard';
import type { Product } from '@/types/product';

describe('RestaurantsCard', () => {
  it('should match snapshot', () => {
    const mockProduct: Product = {
      id: '1',
      name: 'Pizza',
      description: 'Delicious pizza',
      price: '10',
      image: '/pizza.jpg',
      category: 'Pizza',
    };
    const { asFragment } = render(<RestaurantsCard {...mockProduct} />);

    expect(asFragment()).toMatchSnapshot();
  });
});
