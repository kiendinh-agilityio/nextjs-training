import { render, screen } from '@testing-library/react';
import CartContainer from './CartContainer';

describe('CartContainer', () => {
  it('renders the heading Your Cart', () => {
    render(
      <CartContainer>
        <div>Test Children</div>
      </CartContainer>,
    );
    expect(screen.getByText('Your Cart')).toBeInTheDocument();
  });

  it('renders children', () => {
    render(
      <CartContainer>
        <div data-testid="cart-children">Test Children</div>
      </CartContainer>,
    );
    expect(screen.getByTestId('cart-children')).toHaveTextContent(
      'Test Children',
    );
  });

  it('matches snapshot', () => {
    const { container } = render(
      <CartContainer>
        <div>Snapshot Children</div>
      </CartContainer>,
    );
    expect(container).toMatchSnapshot();
  });
});
