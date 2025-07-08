import { render } from '@testing-library/react';
import ProductRelatedSection from './ProductRelatedSection';
import { Product } from '@/types/product';

const mockRelatedProducts: Product[] = [
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
];

describe('ProductRelatedSection', () => {
  it('matches snapshot', () => {
    const { container } = render(
      <ProductRelatedSection relatedProducts={mockRelatedProducts} />,
    );
    expect(container).toMatchSnapshot();
  });
});
