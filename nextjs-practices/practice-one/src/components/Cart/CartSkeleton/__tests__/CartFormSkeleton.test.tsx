import { render } from '@testing-library/react';
import { CartFormSkeleton } from '@/components/Cart/CartSkeleton';

describe('CartFormSkeleton', () => {
  it('renders skeleton container', () => {
    const { container } = render(<CartFormSkeleton />);
    expect(container.firstChild).toHaveClass(
      'flex min-h-[260px] w-full flex-col gap-4 rounded-2xl border p-8 lg:max-w-md',
    );
  });

  it('matches snapshot', () => {
    const { container } = render(<CartFormSkeleton />);
    expect(container).toMatchSnapshot();
  });
});
