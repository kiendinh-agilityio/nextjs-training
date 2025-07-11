import { render } from '@testing-library/react';
import { CartFormSkeleton } from '@/components/Cart/CartSkeleton';

describe('CartFormSkeleton', () => {
  it('renders skeleton container', () => {
    const { container } = render(<CartFormSkeleton />);
    expect(container.firstChild).toHaveClass(
      'flex',
      'animate-pulse',
      'rounded-2xl',
    );
  });

  it('matches snapshot', () => {
    const { container } = render(<CartFormSkeleton />);
    expect(container).toMatchSnapshot();
  });
});
