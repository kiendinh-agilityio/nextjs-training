import { render, screen } from '@testing-library/react';
import CartList from './CartList';
import type { CartItem as CartItemType } from '@/types/cart';
import { useCartStore as useCartStoreMock } from '@/stores/useCartStore';

jest.mock('@/stores/useCartStore', () => ({
  useCartStore: jest.fn(),
}));

jest.mock('./CartItem/CartItem', () => {
  const MockCartItem = (props: { item: CartItemType }) => (
    <div data-testid="cart-item">CartItem: {props.item.id}</div>
  );
  MockCartItem.displayName = 'MockCartItem';
  return MockCartItem;
});

jest.mock('../CartEmpty/CartEmpty', () => {
  const MockCartEmpty = () => <div data-testid="cart-empty">CartEmpty</div>;
  MockCartEmpty.displayName = 'MockCartEmpty';
  return MockCartEmpty;
});

describe('CartList', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correct number of CartItem', () => {
    (useCartStoreMock as unknown as jest.Mock).mockReturnValue({
      items: [
        { id: '1', name: 'A', price: 1, quantity: 1 },
        { id: '2', name: 'B', price: 2, quantity: 2 },
      ],
    });
    render(<CartList />);
    expect(screen.getAllByTestId('cart-item')).toHaveLength(2);
  });

  it('renders CartEmpty when no items', () => {
    (useCartStoreMock as unknown as jest.Mock).mockReturnValue({ items: [] });
    render(<CartList />);
    expect(screen.getByTestId('cart-empty')).toBeInTheDocument();
  });

  it('matches snapshot with items', () => {
    (useCartStoreMock as unknown as jest.Mock).mockReturnValue({
      items: [
        { id: '1', name: 'A', price: 1, quantity: 1 },
        { id: '2', name: 'B', price: 2, quantity: 2 },
      ],
    });
    const { container } = render(<CartList />);
    expect(container).toMatchSnapshot();
  });
});
