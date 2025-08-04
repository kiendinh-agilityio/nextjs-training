import { render, screen, fireEvent } from '@testing-library/react';
import HeaderInfoBar from './HeaderInfoBar';
import { useCartStore } from '@/stores/useCartStore';
import { useSession } from 'next-auth/react';

// Mocks
jest.mock('@/stores/useCartStore', () => ({
  useCartStore: jest.fn(),
}));

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
}));

const mockPush = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}));

jest.mock('@/components/common/ui/button', () => ({
  Button: ({
    children,
    ariaLabel,
    ...props
  }: React.PropsWithChildren<{ ariaLabel?: string }>) => (
    <button data-testid="button-mock" aria-label={ariaLabel} {...props}>
      {children}
    </button>
  ),
}));

jest.mock('@/components/Icons/LocationIcon', () => {
  const LocationIconMock = () => <svg data-testid="location-icon" />;
  LocationIconMock.displayName = 'LocationIconMock';

  return LocationIconMock;
});

jest.mock('@/components/Icons/CartIcon', () => {
  const CartIconMock = (props: React.SVGProps<SVGSVGElement>) => (
    <svg data-testid="cart-icon" {...props} />
  );
  CartIconMock.displayName = 'CartIconMock';

  return CartIconMock;
});

const mockUseCartStore = useCartStore as unknown as jest.Mock;
const mockUseSession = useSession as unknown as jest.Mock;

describe('HeaderInfoBar', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders promo and location info', () => {
    mockUseCartStore.mockReturnValue({ items: [] });
    mockUseSession.mockReturnValue({ data: null });
    render(<HeaderInfoBar />);
    expect(
      screen.getByText(/get 5% off your first order/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/regent street/i)).toBeInTheDocument();
    expect(screen.getByTestId('location-icon')).toBeInTheDocument();
  });

  it('shows cart count when items exist', () => {
    mockUseCartStore.mockReturnValue({ items: [{ id: '1', quantity: 2 }] });
    mockUseSession.mockReturnValue({ data: null });
    render(<HeaderInfoBar />);
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('navigates to cart if authenticated', () => {
    mockUseCartStore.mockReturnValue({ items: [] });
    mockUseSession.mockReturnValue({
      data: { user: { email: 'test@example.com' } },
    });

    render(<HeaderInfoBar />);

    fireEvent.click(screen.getByLabelText('Button Cart'));
    expect(mockPush).toHaveBeenCalledWith('/cart');
  });

  it('navigates to login if not authenticated', () => {
    mockUseCartStore.mockReturnValue({ items: [] });
    mockUseSession.mockReturnValue({ data: null });

    render(<HeaderInfoBar />);

    fireEvent.click(screen.getByLabelText('Button Cart'));
    expect(mockPush).toHaveBeenCalledWith('/login');
  });

  it('matches snapshot', () => {
    mockUseCartStore.mockReturnValue({ items: [] });
    mockUseSession.mockReturnValue({ data: null });

    const { asFragment } = render(<HeaderInfoBar />);
    expect(asFragment()).toMatchSnapshot();
  });
});
