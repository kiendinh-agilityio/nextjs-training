import { render, screen } from '@testing-library/react';
import CartLayout from './CartLayout';

describe('CartLayout', () => {
  it('renders children', () => {
    render(
      <CartLayout>
        <div data-testid="cart-layout-child">Child</div>
      </CartLayout>,
    );
    expect(screen.getByTestId('cart-layout-child')).toHaveTextContent('Child');
  });

  it('matches snapshot', () => {
    const { container } = render(
      <CartLayout>
        <div>Snapshot Child</div>
      </CartLayout>,
    );
    expect(container).toMatchSnapshot();
  });
});
