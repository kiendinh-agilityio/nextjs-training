import { render, screen } from '@testing-library/react';
import CartEmpty from './CartEmpty';

describe('CartEmpty', () => {
  it('renders empty cart message', () => {
    render(<CartEmpty />);
    expect(screen.getByText('Your cart is empty')).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { container } = render(<CartEmpty />);
    expect(container).toMatchSnapshot();
  });
});
