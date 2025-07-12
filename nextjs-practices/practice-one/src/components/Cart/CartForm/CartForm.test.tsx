import { render, screen } from '@testing-library/react';
import CartForm from './CartForm';

describe('CartForm', () => {
  const defaultProps = {
    subTotal: 100,
    discount: 10,
    total: 90,
  };

  it('renders order summary values', () => {
    render(<CartForm {...defaultProps} />);
    expect(screen.getByText('Order Summary')).toBeInTheDocument();
    expect(screen.getByText('$100.00')).toBeInTheDocument();
    expect(screen.getByText('-10')).toBeInTheDocument();
    expect(screen.getByText('90')).toBeInTheDocument();
  });

  it('renders coupon input and apply button', () => {
    render(<CartForm {...defaultProps} />);
    expect(
      screen.getByPlaceholderText('Apply Coupon Code here'),
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Button apply coupon')).toBeInTheDocument();
  });

  it('renders checkout button', () => {
    render(<CartForm {...defaultProps} />);
    expect(screen.getByLabelText('Button checkout')).toBeInTheDocument();
    expect(screen.getByText('Go to Checkout')).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { container } = render(<CartForm {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
