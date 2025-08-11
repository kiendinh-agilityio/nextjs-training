import { render, screen, waitFor } from '@testing-library/react';
import RestaurantsGroup from './RestaurantsGroup';
import type { Product } from '@/types/product';
import { PRODUCTS_DATA } from '@/mocks/products';

const groupByCategory = (products: Product[]) => {
  const map = new Map<string, Product[]>();
  products.forEach((p) => {
    if (!map.has(p.category)) {
      map.set(p.category, []);
    }
    map.get(p.category)!.push(p);
  });
  return Array.from(map.entries());
};

describe('RestaurantsGroup', () => {
  const mockCategories = groupByCategory(PRODUCTS_DATA);

  it('renders all categories', async () => {
    const { asFragment } = render(
      <RestaurantsGroup categories={mockCategories} />,
    );
    await waitFor(() => {
      expect(screen.getByText('Burgers')).toBeInTheDocument();
      expect(screen.getByText('Pizza')).toBeInTheDocument();
      expect(screen.getByText('Breakfast')).toBeInTheDocument();
    });
    expect(asFragment()).toMatchSnapshot('all categories');
  });

  it('renders only one category if filtered', async () => {
    const filtered = mockCategories.filter(([cat]) => cat === 'Burgers');
    const { asFragment } = render(<RestaurantsGroup categories={filtered} />);
    await waitFor(() => {
      expect(screen.getByText('Burgers')).toBeInTheDocument();
      expect(screen.queryByText('Pizza')).not.toBeInTheDocument();
    });
    expect(asFragment()).toMatchSnapshot('filtered category');
  });

  it('renders nothing if categories is empty', async () => {
    const { asFragment } = render(<RestaurantsGroup categories={[]} />);
    await waitFor(() => {
      expect(screen.queryByText('Burgers')).not.toBeInTheDocument();
      expect(screen.queryByText('Pizza')).not.toBeInTheDocument();
      expect(screen.queryByText('Breakfast')).not.toBeInTheDocument();
    });
    expect(asFragment()).toMatchSnapshot('empty data');
  });
});
