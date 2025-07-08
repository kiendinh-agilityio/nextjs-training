import { render } from '@testing-library/react';
import ProductRelatedSection from './ProductRelatedSection';
import { Product } from '@/types/product';

jest.mock('@/actions/product', () => ({
  getRestaurantList: jest.fn().mockResolvedValue([
    {
      id: '2',
      name: 'Burger',
      description: 'Tasty burger',
      price: '8',
      image: '/burger.jpg',
      category: 'Italian',
      rating: '4.0',
      ingredients: ['Beef', 'Lettuce', 'Cheese'],
    },
    {
      id: '3',
      name: 'Pasta',
      description: 'Yummy pasta',
      price: '12',
      image: '/pasta.jpg',
      category: 'Italian',
      rating: '4.2',
      ingredients: ['Pasta', 'Tomato', 'Cheese'],
    },
  ]),
}));

const mockProduct: Product = {
  id: '1',
  name: 'Pizza',
  description: 'Delicious pizza',
  price: '10',
  image: '/pizza.jpg',
  category: 'Italian',
  rating: '4.5',
  ingredients: ['Cheese', 'Tomato', 'Basil'],
};

describe('ProductRelatedSection', () => {
  it('matches snapshot', async () => {
    const { container } = render(
      <ProductRelatedSection product={mockProduct} />,
    );

    expect(container).toMatchSnapshot();
  });
});
