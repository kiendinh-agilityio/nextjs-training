import React from 'react';
import { render } from '@testing-library/react';
import type { Product } from '@/types/product';

// Mock child components to avoid duplicate rendering and focus on page logic
jest.mock('@/components/ProductDetail', () => {
  const ProductDetailContent = (props: React.ComponentProps<'div'>) => (
    <div data-testid="ProductDetailContent" {...props} />
  );
  ProductDetailContent.displayName = 'ProductDetailContent';

  const ProductRelatedSection = (props: React.ComponentProps<'div'>) => (
    <div data-testid="ProductRelatedSection" {...props} />
  );
  ProductRelatedSection.displayName = 'ProductRelatedSection';

  return {
    ProductDetailContent,
    ProductRelatedSection,
  };
});

// Mock next/image
const MockedImage = (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
  // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
  return <img {...props} />;
};
MockedImage.displayName = 'MockedImage';
jest.mock('next/image', () => MockedImage);

// Mock next/link
const MockedLink = ({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) => <a href={href}>{children}</a>;
MockedLink.displayName = 'MockedLink';
jest.mock('next/link', () => MockedLink);

jest.mock('@/actions/product', () => ({
  getProductDetail: jest.fn(),
  getRestaurantList: jest.fn(),
}));

import ProductDetailPage from '../page';
import { getProductDetail, getRestaurantList } from '@/actions/product';

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

const mockRelated: Product[] = [
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

describe('ProductDetailPage (server snapshot)', () => {
  const params = Promise.resolve({ id: '1' });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders product detail and related section (snapshot)', async () => {
    (getProductDetail as jest.Mock).mockResolvedValue(mockProduct);
    (getRestaurantList as jest.Mock).mockResolvedValue([
      mockProduct,
      ...mockRelated,
    ]);

    const jsx = await ProductDetailPage({ params });
    const { asFragment } = render(<>{jsx}</>);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders "Product not found" if product is missing (snapshot)', async () => {
    (getProductDetail as jest.Mock).mockResolvedValue(null);
    (getRestaurantList as jest.Mock).mockResolvedValue([]);

    const jsx = await ProductDetailPage({ params });
    const { asFragment } = render(<>{jsx}</>);
    expect(asFragment()).toMatchSnapshot();
  });
});
