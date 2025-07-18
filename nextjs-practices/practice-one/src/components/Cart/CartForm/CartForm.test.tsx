import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import CartForm from './CartForm';

type ApplyCouponResult = {
  valid: boolean;
  message: string;
  discount: number;
  percent: number;
};

type UseCartStoreMock = {
  items: { id: number; name: string }[];
  clearCart: jest.Mock;
  setCouponCart: jest.Mock;
  clearCoupon: jest.Mock;
  discount: number;
};

// Mock toast
jest.mock('sonner', () => ({
  toast: { success: jest.fn() },
}));

import { toast } from 'sonner';

// Mock useCartStore
const clearCart = jest.fn();
const setCouponCart = jest.fn();
const clearCoupon = jest.fn();
let itemsMock: UseCartStoreMock['items'] = [{ id: 1, name: 'Test item' }];

jest.mock('@/stores/useCartStore', () => ({
  useCartStore: () => ({
    items: itemsMock,
    clearCart,
    setCouponCart,
    clearCoupon,
    discount: 10,
  }),
}));

// Mock applyCoupon
const applyCouponMock: jest.Mock<
  Promise<ApplyCouponResult>,
  [{ code: string; subTotal: number }]
> = jest.fn();

jest.mock('@/actions/cart', () => ({
  applyCoupon: (params: { code: string; subTotal: number }) =>
    applyCouponMock(params),
}));

describe('CartForm', () => {
  const defaultProps = {
    subTotal: 100,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    itemsMock = [{ id: 1, name: 'Test item' }];
  });

  beforeAll(() => {
    jest.useFakeTimers();
  });
  afterAll(() => {
    jest.useRealTimers();
  });

  it('renders order summary values', () => {
    render(<CartForm {...defaultProps} />);
    expect(screen.getByText('Order Summary')).toBeInTheDocument();
    expect(screen.getByText('$100.00')).toBeInTheDocument();
    expect(screen.getByText('-10')).toBeInTheDocument();
    expect(screen.getByText('$90.00')).toBeInTheDocument();
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
    expect(screen.getByText('Checkout')).toBeInTheDocument();
  });

  it('disables checkout button and shows loading when processing', async () => {
    render(<CartForm {...defaultProps} />);
    const checkoutBtn = screen.getByLabelText('Button checkout');
    act(() => {
      fireEvent.click(checkoutBtn);
    });
    expect(checkoutBtn).toBeDisabled();
    expect(screen.getByText('Processing...')).toBeInTheDocument();

    act(() => {
      jest.runAllTimers();
    });
    await waitFor(() => expect(clearCart).toHaveBeenCalled());
    await waitFor(() => expect(clearCoupon).toHaveBeenCalled());
  });

  it('calls handleCheckout and resets state, shows toast', async () => {
    render(<CartForm {...defaultProps} />);
    const checkoutBtn = screen.getByLabelText('Button checkout');
    act(() => {
      fireEvent.click(checkoutBtn);
      jest.runAllTimers();
    });
    await waitFor(() => expect(clearCart).toHaveBeenCalled());
    await waitFor(() => expect(clearCoupon).toHaveBeenCalled());
    await waitFor(() => {
      expect(toast.success).toHaveBeenCalled();
    });
  });

  it('calls handleCouponChange when typing in input', () => {
    render(<CartForm {...defaultProps} />);
    const input = screen.getByPlaceholderText('Apply Coupon Code here');
    fireEvent.change(input, { target: { value: 'SAVE10' } });
    expect((input as HTMLInputElement).value).toBe('SAVE10');
  });

  it('calls handleApplyCoupon with valid coupon', async () => {
    applyCouponMock.mockResolvedValue({
      valid: true,
      message: 'Success',
      discount: 20,
      percent: 10,
    });
    render(<CartForm {...defaultProps} />);
    const input = screen.getByPlaceholderText('Apply Coupon Code here');
    fireEvent.change(input, { target: { value: 'SAVE10' } });
    const applyBtn = screen.getByLabelText('Button apply coupon');
    await act(async () => {
      fireEvent.click(applyBtn);
    });
    await waitFor(() =>
      expect(applyCouponMock).toHaveBeenCalledWith({
        code: 'SAVE10',
        subTotal: 100,
      }),
    );
    await waitFor(() =>
      expect(setCouponCart).toHaveBeenCalledWith('SAVE10', 20),
    );
    expect(screen.getByText('Success')).toBeInTheDocument();
  });

  it('calls handleApplyCoupon with invalid coupon', async () => {
    applyCouponMock.mockResolvedValue({
      valid: false,
      message: 'Invalid',
      discount: 0,
      percent: 0,
    });
    render(<CartForm {...defaultProps} />);
    const input = screen.getByPlaceholderText('Apply Coupon Code here');
    fireEvent.change(input, { target: { value: 'WRONG' } });
    const applyBtn = screen.getByLabelText('Button apply coupon');
    await act(async () => {
      fireEvent.click(applyBtn);
    });
    await waitFor(() =>
      expect(applyCouponMock).toHaveBeenCalledWith({
        code: 'WRONG',
        subTotal: 100,
      }),
    );
    expect(screen.getByText('Invalid')).toBeInTheDocument();
  });

  it('disables apply button when coupon is empty or pending', () => {
    render(<CartForm {...defaultProps} />);
    const applyBtn = screen.getByLabelText('Button apply coupon');
    expect(applyBtn).toBeDisabled();
    const input = screen.getByPlaceholderText('Apply Coupon Code here');
    fireEvent.change(input, { target: { value: 'SOME' } });
    expect(applyBtn).not.toBeDisabled();
  });

  it('shows coupon message with correct status class', async () => {
    applyCouponMock.mockResolvedValue({
      valid: true,
      message: 'Coupon OK',
      discount: 10,
      percent: 5,
    });
    render(<CartForm {...defaultProps} />);
    const input = screen.getByPlaceholderText('Apply Coupon Code here');
    fireEvent.change(input, { target: { value: 'OK' } });
    const applyBtn = screen.getByLabelText('Button apply coupon');
    await act(async () => {
      fireEvent.click(applyBtn);
    });
    await waitFor(() =>
      expect(screen.getByText('Coupon OK')).toBeInTheDocument(),
    );
    expect(screen.getByText('Coupon OK').className).toMatch(/text-success/);
  });

  it('matches snapshot (default)', () => {
    const { container } = render(<CartForm {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });

  it('matches snapshot (with coupon success)', async () => {
    applyCouponMock.mockResolvedValue({
      valid: true,
      message: 'Coupon OK',
      discount: 10,
      percent: 5,
    });
    const { container } = render(<CartForm {...defaultProps} />);
    const input = screen.getByPlaceholderText('Apply Coupon Code here');
    fireEvent.change(input, { target: { value: 'OK' } });
    const applyBtn = screen.getByLabelText('Button apply coupon');
    await act(async () => {
      fireEvent.click(applyBtn);
    });
    await waitFor(() =>
      expect(screen.getByText('Coupon OK')).toBeInTheDocument(),
    );
    expect(container).toMatchSnapshot();
  });

  it('matches snapshot (with coupon error)', async () => {
    applyCouponMock.mockResolvedValue({
      valid: false,
      message: 'Invalid',
      discount: 0,
      percent: 0,
    });
    const { container } = render(<CartForm {...defaultProps} />);
    const input = screen.getByPlaceholderText('Apply Coupon Code here');
    fireEvent.change(input, { target: { value: 'WRONG' } });
    const applyBtn = screen.getByLabelText('Button apply coupon');
    await act(async () => {
      fireEvent.click(applyBtn);
    });
    await waitFor(() =>
      expect(screen.getByText('Invalid')).toBeInTheDocument(),
    );
    expect(container).toMatchSnapshot();
  });
});
