import { render } from '@testing-library/react';
import ProductDetailSkeleton from './ProductDetailSkeleton';

describe('ProductDetailSkeleton', () => {
  it('matches snapshot', () => {
    const { container } = render(<ProductDetailSkeleton />);

    expect(container).toMatchSnapshot();
  });
});
