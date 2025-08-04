import { render } from '@testing-library/react';

// import constants
import { ROUTERS } from '@/constants/router';

// import shared UI
import CartPage from '../page';

jest.mock('@/components/Cart/CartContent/CartContent', () => {
  const MockCartContent = () => (
    <div data-testid="cart-content-mock">CartContent</div>
  );
  MockCartContent.displayName = 'MockCartContent';
  return MockCartContent;
});

const redirectMock = jest.fn();
jest.mock('next/navigation', () => ({
  redirect: (...args: unknown[]) => redirectMock(...args),
}));

const authMock = jest.fn();
jest.mock('@/lib/auth', () => ({
  auth: () => authMock(),
}));

describe('CartPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('redirects to login if not authenticated', async () => {
    authMock.mockResolvedValue({ user: undefined });
    await (CartPage as () => Promise<React.ReactElement>)();
    expect(redirectMock).toHaveBeenCalledWith(ROUTERS.LOGIN);
  });

  it('renders CartContent if authenticated', async () => {
    authMock.mockResolvedValue({ user: { email: 'test@example.com' } });
    const result = await (CartPage as () => Promise<React.ReactElement>)();

    const { asFragment, getByTestId } = render(result);
    expect(getByTestId('cart-content-mock')).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
});
