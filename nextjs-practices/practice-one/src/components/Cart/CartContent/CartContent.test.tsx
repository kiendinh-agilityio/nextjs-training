import { render, screen } from '@testing-library/react';
import CartContent from './CartContent';
import { useCartStore as mockUseCartStore } from '@/stores/useCartStore';

jest.mock('@/stores/useCartStore', () => ({
  useCartStore: jest.fn(),
}));

jest.mock('@/components/Cart/CartList/CartList', () => {
  const MockCartList = () => <div data-testid="cart-list">CartList</div>;
  MockCartList.displayName = 'MockCartList';
  return MockCartList;
});

jest.mock('@/components/Cart/CartForm/CartForm', () => {
  const MockCartForm = (props: { subTotal: number }) => (
    <div data-testid="cart-form">CartForm: {props.subTotal}</div>
  );
  MockCartForm.displayName = 'MockCartForm';
  return MockCartForm;
});

jest.mock('@/components/Cart/CartEmpty/CartEmpty', () => {
  const MockCartEmpty = () => <div data-testid="cart-empty">CartEmpty</div>;
  MockCartEmpty.displayName = 'MockCartEmpty';
  return MockCartEmpty;
});

jest.mock('@/components/Cart/CartSkeleton/index.ts', () => {
  const MockCartListSkeleton = () => (
    <div data-testid="cart-list-skeleton">CartListSkeleton</div>
  );
  MockCartListSkeleton.displayName = 'MockCartListSkeleton';
  const MockCartFormSkeleton = () => (
    <div data-testid="cart-form-skeleton">CartFormSkeleton</div>
  );
  MockCartFormSkeleton.displayName = 'MockCartFormSkeleton';
  return {
    CartListSkeleton: MockCartListSkeleton,
    CartFormSkeleton: MockCartFormSkeleton,
  };
});

describe('CartContent', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders CartEmpty and CartForm when not hydrated and no items', () => {
    (mockUseCartStore as unknown as jest.Mock).mockReturnValue({
      _hasHydrated: false,
      items: [],
      subTotal: 0,
      discount: 0,
      total: 0,
    });
    render(<CartContent />);
    expect(screen.getByTestId('cart-empty')).toBeInTheDocument();
    expect(screen.getByTestId('cart-form')).toHaveTextContent('0');
  });

  it('renders CartList and CartForm when hydrated and has items', () => {
    (mockUseCartStore as unknown as jest.Mock).mockReturnValue({
      _hasHydrated: true,
      items: [{ id: '1' }],
      subTotal: 10,
      discount: 2,
      total: 8,
    });
    render(<CartContent />);
    expect(screen.getByTestId('cart-list')).toBeInTheDocument();
    expect(screen.getByTestId('cart-form')).toHaveTextContent('10');
  });

  it('renders CartEmpty and CartForm when hydrated and no items', () => {
    (mockUseCartStore as unknown as jest.Mock).mockReturnValue({
      _hasHydrated: true,
      items: [],
      subTotal: 0,
      discount: 0,
      total: 0,
    });
    render(<CartContent />);
    expect(screen.getByTestId('cart-empty')).toBeInTheDocument();
    expect(screen.getByTestId('cart-form')).toHaveTextContent('0');
  });

  it('matches snapshot when hydrated and has items', () => {
    (mockUseCartStore as unknown as jest.Mock).mockReturnValue({
      _hasHydrated: true,
      items: [{ id: '1' }],
      subTotal: 10,
      discount: 2,
      total: 8,
    });
    const { container } = render(<CartContent />);
    expect(container).toMatchSnapshot();
  });
});
