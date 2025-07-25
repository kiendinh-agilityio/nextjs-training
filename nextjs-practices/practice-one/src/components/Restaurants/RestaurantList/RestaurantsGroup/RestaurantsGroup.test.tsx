import { render, screen, waitFor } from '@testing-library/react';
import type { Product } from '@/types/product';
import RestaurantsGroup from './RestaurantsGroup';

describe('RestaurantsGroup', () => {
  const mockCategories: [string, Product[]][] = [
    [
      'Burgers',
      [
        {
          id: '1',
          name: 'Pizza',
          description: 'Delicious pizza',
          price: '10',
          image: '/pizza.jpg',
          category: 'Burgers',
        },
      ],
    ],
    [
      'Fries',
      [
        {
          id: '2',
          name: 'Sushi',
          description: 'Fresh sushi',
          price: '15',
          image: '/sushi.jpg',
          category: 'Fries',
        },
      ],
    ],
    [
      'Breakfast',
      [
        {
          id: '3',
          name: 'Eggs',
          description: 'Boiled eggs',
          price: '5',
          image: '/eggs.jpg',
          category: 'Breakfast',
        },
      ],
    ],
  ];

  it('renders all categories', async () => {
    const { asFragment } = render(
      <RestaurantsGroup categories={mockCategories} />,
    );
    await waitFor(() => {
      expect(screen.getByText('Burgers')).toBeInTheDocument();
      expect(screen.getByText('Fries')).toBeInTheDocument();
      expect(screen.getByText('Breakfast')).toBeInTheDocument();
    });
    expect(asFragment()).toMatchSnapshot('all categories');
  });

  it('renders only one category if filtered', async () => {
    const filtered = mockCategories.filter(([cat]) => cat === 'Burgers');
    const { asFragment } = render(<RestaurantsGroup categories={filtered} />);
    await waitFor(() => {
      expect(screen.getByText('Burgers')).toBeInTheDocument();
      expect(screen.queryByText('Fries')).not.toBeInTheDocument();
    });
    expect(asFragment()).toMatchSnapshot('filtered category');
  });

  it('renders nothing if categories is empty', async () => {
    const { asFragment } = render(<RestaurantsGroup categories={[]} />);
    await waitFor(() => {
      expect(screen.queryByText('Burgers')).not.toBeInTheDocument();
      expect(screen.queryByText('Fries')).not.toBeInTheDocument();
      expect(screen.queryByText('Breakfast')).not.toBeInTheDocument();
    });
    expect(asFragment()).toMatchSnapshot('empty data');
  });
});
