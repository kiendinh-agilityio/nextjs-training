import { render } from '@testing-library/react';
import ProductRating from './ProductRating';

describe('ProductRating', () => {
  it('matches snapshot', () => {
    const { container } = render(<ProductRating rating={4.5} />);

    expect(container).toMatchSnapshot();
  });
});
