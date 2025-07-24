import { render, screen } from '@testing-library/react';
import FilteredCategory from './FilteredCategory';

jest.mock('../RestaurantsCategoryList/RestaurantsCategoryList', () => ({
  __esModule: true,
  default: ({ category }: { category: string }) => (
    <div data-testid="mock-category-list">Category: {category}</div>
  ),
}));

describe('FilteredCategory', () => {
  it('returns null if category is undefined', () => {
    const { container } = render(<FilteredCategory />);
    expect(container.firstChild).toBeNull();
  });

  it('returns null if category is "Offers"', () => {
    const { container } = render(<FilteredCategory category="Offers" />);
    expect(container.firstChild).toBeNull();
  });

  it('renders section and RestaurantsCategoryList if category is valid', () => {
    const { asFragment } = render(<FilteredCategory category="Burgers" />);
    expect(screen.getByTestId('mock-category-list')).toHaveTextContent(
      'Category: Burgers',
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
