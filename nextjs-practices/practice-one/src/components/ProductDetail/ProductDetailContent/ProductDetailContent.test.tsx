import { useSession } from 'next-auth/react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Product } from '@/types/product';
import { useCartStore } from '@/stores/useCartStore';
import ProductDetailContent from './ProductDetailContent';

const mockAddItem = jest.fn();
const mockRemoveItem = jest.fn();
const mockSetOptimisticItems = jest.fn();
const mockFormAction = jest.fn();
const mockLoginToast = jest.fn();

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
}));
jest.mock('@/stores/useCartStore', () => ({
  useCartStore: jest.fn(),
}));
jest.mock('@/hooks/useCartAction', () => ({
  useCartAction: () => ({ formAction: mockFormAction }),
}));
jest.mock('@/components/LoginToast/LoginToast', () => ({
  __esModule: true,
  default: () => mockLoginToast(),
}));

// Mock useOptimistic, useTransition
jest.mock('react', () => {
  const actualReact = jest.requireActual('react');
  return {
    ...actualReact,
    useOptimistic: (items: unknown) => [items, mockSetOptimisticItems],
    useTransition: () => [false, (cb: () => void) => cb()],
  };
});

const mockProduct: Product = {
  id: '1',
  name: 'Pizza',
  description: 'Delicious pizza',
  price: '10',
  image: '/pizza.jpg',
  category: 'Italian',
  rating: '4.5',
  ingredients: ['Cheese', 'Tomato', 'Basil'],
};

describe('ProductDetailContent', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('matches snapshot (not in cart)', () => {
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { email: 'test@example.com' } },
    });
    (useCartStore as unknown as jest.Mock).mockReturnValue({
      items: [],
      addItem: mockAddItem,
      removeItem: mockRemoveItem,
    });
    const { container } = render(
      <ProductDetailContent product={mockProduct} />,
    );
    expect(container).toMatchSnapshot();
  });

  it('matches snapshot (in cart)', () => {
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { email: 'test@example.com' } },
    });
    (useCartStore as unknown as jest.Mock).mockReturnValue({
      items: [{ ...mockProduct, id: '1', quantity: 1 }],
      addItem: mockAddItem,
      removeItem: mockRemoveItem,
    });
    const { container } = render(
      <ProductDetailContent product={mockProduct} />,
    );
    expect(container).toMatchSnapshot();
  });

  it('calls LoginToast if not logged in and Add to Cart is clicked', () => {
    (useSession as jest.Mock).mockReturnValue({ data: null });
    (useCartStore as unknown as jest.Mock).mockReturnValue({
      items: [],
      addItem: mockAddItem,
      removeItem: mockRemoveItem,
    });
    render(<ProductDetailContent product={mockProduct} />);
    const btn = screen.getByRole('button', { name: /add to cart/i });
    fireEvent.click(btn);
    expect(mockLoginToast).toHaveBeenCalled();
    expect(mockAddItem).not.toHaveBeenCalled();
    expect(mockFormAction).not.toHaveBeenCalled();
  });

  it('calls addItem, setOptimisticItems, and formAction when Add to Cart is clicked and logged in', () => {
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { email: 'test@example.com' } },
    });
    (useCartStore as unknown as jest.Mock).mockReturnValue({
      items: [],
      addItem: mockAddItem,
      removeItem: mockRemoveItem,
    });
    render(<ProductDetailContent product={mockProduct} />);
    const btn = screen.getByRole('button', { name: /add to cart/i });
    fireEvent.click(btn);
    expect(mockAddItem).toHaveBeenCalled();
    expect(mockSetOptimisticItems).toHaveBeenCalled();
    expect(mockFormAction).toHaveBeenCalledWith({
      type: 'add',
      payload: {
        id: '1',
        name: 'Pizza',
        price: 10,
        image: '/pizza.jpg',
        category: 'Italian',
      },
    });
  });

  it('calls removeItem, setOptimisticItems, and formAction when Remove from Cart is clicked', () => {
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { email: 'test@example.com' } },
    });
    (useCartStore as unknown as jest.Mock).mockReturnValue({
      items: [{ ...mockProduct, id: '1', quantity: 1 }],
      addItem: mockAddItem,
      removeItem: mockRemoveItem,
    });
    render(<ProductDetailContent product={mockProduct} />);
    const btn = screen.getByRole('button', { name: /remove from cart/i });
    fireEvent.click(btn);
    expect(mockRemoveItem).toHaveBeenCalledWith('1');
    expect(mockSetOptimisticItems).toHaveBeenCalled();
    expect(mockFormAction).toHaveBeenCalledWith({
      type: 'remove',
      payload: '1',
    });
  });
});
