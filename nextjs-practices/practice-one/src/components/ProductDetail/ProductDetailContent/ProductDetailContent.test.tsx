import { render } from '@testing-library/react';
import ProductDetailContent from './ProductDetailContent';
import { Product } from '@/types/product';

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

describe('ProductDetailContent', () => {
  it('matches snapshot', () => {
    const { container } = render(
      <ProductDetailContent product={mockProduct} />,
    );

    expect(container).toMatchSnapshot();
  });
});
