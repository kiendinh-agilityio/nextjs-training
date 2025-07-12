import { render, screen, fireEvent } from '@testing-library/react';
import { ImgHTMLAttributes } from 'react';
import CartItem from './CartItem';
import type { CartItem as CartItemType } from '@/types/cart';
import { useCartStore as mockUseCartStore } from '@/stores/useCartStore';

jest.mock('@/stores/useCartStore', () => ({
  useCartStore: jest.fn(),
}));

jest.mock('@/hooks/useCartAction', () => ({
  useCartAction: () => ({ formAction: jest.fn() }),
}));

jest.mock('next/image', () => {
  const MockImage = (props: ImgHTMLAttributes<HTMLImageElement>) => {
    return <img {...props} alt={props.alt ?? ''} />;
  };
  MockImage.displayName = 'NextImage';
  return MockImage;
});

const mockRemoveItem = jest.fn();
const mockUpdateQuantity = jest.fn();

const item: CartItemType = {
  id: '1',
  name: 'Test Product',
  price: 50,
  quantity: 2,
  image: 'test.jpg',
  category: 'TestCat',
};

describe('CartItem', () => {
  beforeEach(() => {
    (mockUseCartStore as unknown as jest.Mock).mockReturnValue({
      removeItem: mockRemoveItem,
      updateQuantity: mockUpdateQuantity,
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders product info', () => {
    render(<CartItem item={item} />);
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('Category: TestCat')).toBeInTheDocument();
    expect(screen.getByText('$ 50.00')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByAltText('Test Product')).toHaveAttribute(
      'src',
      'test.jpg',
    );
  });

  it('calls removeItem when remove button is clicked', () => {
    render(<CartItem item={item} />);
    fireEvent.click(screen.getByLabelText('Remove item'));
    expect(mockRemoveItem).toHaveBeenCalledWith('1');
  });

  it('calls updateQuantity with quantity-1 when decrease button is clicked', () => {
    render(<CartItem item={item} />);
    fireEvent.click(screen.getByLabelText('Decrease quantity'));
    expect(mockUpdateQuantity).toHaveBeenCalledWith('1', 1);
  });

  it('calls updateQuantity with quantity+1 when increase button is clicked', () => {
    render(<CartItem item={item} />);
    fireEvent.click(screen.getByLabelText('Increase quantity'));
    expect(mockUpdateQuantity).toHaveBeenCalledWith('1', 3);
  });

  it('matches snapshot', () => {
    const { container } = render(<CartItem item={item} />);
    expect(container).toMatchSnapshot();
  });
});
