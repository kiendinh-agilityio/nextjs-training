import { render, screen } from '@testing-library/react';
import Loading from '../loading';

// Mock ProductDetailSkeleton to ensure the test is isolated and not duplicating its own tests
jest.mock('@/components/ProductDetail/', () => ({
  ProductDetailSkeleton: () => <div data-testid="product-detail-skeleton" />,
}));

describe('Loading', () => {
  it('renders ProductDetailSkeleton', () => {
    render(<Loading />);
    expect(screen.getByTestId('product-detail-skeleton')).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { container } = render(<Loading />);
    expect(container).toMatchSnapshot();
  });
});
