import React from 'react';
import { render, screen } from '@testing-library/react';
import RestaurantPage from '../page';

// Mock all child components
jest.mock('@/components/Restaurants', () => ({
  HeroSection: () => <div data-testid="hero-section" />,
  RestaurantHeaderSection: () => (
    <div data-testid="restaurant-header-section" />
  ),
  CategorySection: () => <div data-testid="category-section" />,
  ContactSection: () => <div data-testid="contact-section" />,
  RestaurantListSection: ({ category }: { category?: string }) => (
    <div data-testid="restaurant-list-section">
      {category ? `Category: ${category}` : 'All Categories'}
    </div>
  ),
}));

// Save the original use function
const originalUse = React.use;

describe('RestaurantPage', () => {
  afterAll(() => {
    // Restore the original use function
    React.use = originalUse;
  });

  it('renders correctly with no category (default)', async () => {
    React.use = (() => ({
      category: undefined,
    })) as unknown as typeof React.use;
    const { asFragment } = render(
      <RestaurantPage searchParams={Promise.resolve({})} />,
    );
    expect(screen.getByTestId('hero-section')).toBeInTheDocument();
    expect(screen.getByTestId('restaurant-header-section')).toBeInTheDocument();
    expect(screen.getByTestId('category-section')).toBeInTheDocument();
    expect(screen.getByTestId('restaurant-list-section')).toHaveTextContent(
      'All Categories',
    );
    expect(screen.getByTestId('contact-section')).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders correctly with a category', async () => {
    React.use = (() => ({
      category: 'Burgers',
    })) as unknown as typeof React.use;
    const { asFragment } = render(
      <RestaurantPage
        searchParams={Promise.resolve({ category: 'Burgers' })}
      />,
    );
    expect(screen.getByTestId('restaurant-list-section')).toHaveTextContent(
      'Category: Burgers',
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
