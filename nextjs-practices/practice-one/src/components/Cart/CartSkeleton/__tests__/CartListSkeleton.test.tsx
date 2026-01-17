import { render } from '@testing-library/react';
import { CartListSkeleton } from '@/components/Cart/CartSkeleton';

describe('CartListSkeleton', () => {
  it('renders skeleton container', () => {
    const { container } = render(<CartListSkeleton />);
    expect(container.firstChild).toHaveClass(
      'flex',
      'animate-pulse',
      'rounded-3xl',
    );
  });

  it('matches snapshot', () => {
    const { container } = render(<CartListSkeleton />);
    expect(container).toMatchSnapshot();
  });
});
