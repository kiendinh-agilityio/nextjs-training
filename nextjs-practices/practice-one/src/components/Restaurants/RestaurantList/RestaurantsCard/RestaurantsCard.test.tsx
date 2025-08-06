import * as nextAuthReact from 'next-auth/react';
import * as useCartStoreModule from '@/stores/useCartStore';
import * as useCartActionModule from '@/hooks/useCartAction';
import * as useTransitionModule from 'react';

import { render, fireEvent, screen } from '@testing-library/react';
import RestaurantsCard from './RestaurantsCard';
import type { Product } from '@/types/product';
import LoginToast from '@/components/LoginToast/LoginToast';

jest.mock('@/components/common/ui/card', () => {
  const Card = ({ children }: { children: React.ReactNode }) => (
    <div data-testid="card">{children}</div>
  );
  Card.displayName = 'Card';
  return { Card };
});

jest.mock('@/components/common/ui/button', () => {
  const Button = ({
    children,
    ariaLabel,
    disabled,
    ...props
  }: React.PropsWithChildren<{ ariaLabel: string; disabled?: boolean }>) => (
    <button aria-label={ariaLabel} disabled={Boolean(disabled)} {...props}>
      {children}
    </button>
  );
  Button.displayName = 'Button';
  return { Button };
});

// eslint-disable-next-line @next/next/no-img-element
jest.mock('next/image', () => {
  const MockImage = (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img alt={props.alt || ''} {...props} />
  );
  MockImage.displayName = 'MockImage';
  return MockImage;
});

jest.mock('next/link', () => {
  // eslint-disable-next-line react/display-name
  const Link = ({
    children,
    href,
  }: React.PropsWithChildren<{ href: string }>) => (
    <a href={href}>{children}</a>
  );
  Link.displayName = 'Link';
  return Link;
});

jest.mock('@/components/LoginToast/LoginToast');
jest.mock('@/hooks/useCartAction');

const mockProduct: Product = {
  id: '1',
  name: 'Pizza',
  description: 'Delicious pizza',
  price: '10',
  image: '/pizza.jpg',
  category: 'Pizza',
};

describe('RestaurantsCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should match snapshot', () => {
    (useCartActionModule.useCartAction as jest.Mock).mockReturnValue({
      formAction: jest.fn(),
      isPending: false,
    });
    const { asFragment } = render(<RestaurantsCard {...mockProduct} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should call LoginToast if not logged in when add to cart', () => {
    jest.spyOn(nextAuthReact, 'useSession').mockReturnValue({
      data: null,
      status: 'unauthenticated',
      update: jest.fn(),
    });

    jest.spyOn(useCartStoreModule, 'useCartStore').mockReturnValue({
      items: [],
      addItem: jest.fn(),
      removeItem: jest.fn(),
    });

    (useCartActionModule.useCartAction as jest.Mock).mockReturnValue({
      formAction: jest.fn(),
      isPending: false,
    });

    jest
      .spyOn(useTransitionModule, 'useTransition')
      .mockReturnValue([false, (cb: unknown) => (cb as () => void)()]);
    const loginToastMock = LoginToast as jest.Mock;
    render(<RestaurantsCard {...mockProduct} />);
    fireEvent.click(screen.getByRole('button'));
    expect(loginToastMock).toHaveBeenCalled();
  });

  it('should add item to cart if logged in', () => {
    const addItem = jest.fn();
    const formAction = jest.fn();

    jest.spyOn(nextAuthReact, 'useSession').mockReturnValue({
      data: { user: { email: 'test@mail.com' }, expires: '' },
      status: 'authenticated',
      update: jest.fn(),
    });

    jest.spyOn(useCartStoreModule, 'useCartStore').mockReturnValue({
      items: [],
      addItem,
      removeItem: jest.fn(),
    });

    (useCartActionModule.useCartAction as jest.Mock).mockReturnValue({
      formAction,
      isPending: false,
    });

    jest
      .spyOn(useTransitionModule, 'useTransition')
      .mockReturnValue([false, (cb: unknown) => (cb as () => void)()]);
    render(<RestaurantsCard {...mockProduct} />);
    fireEvent.click(screen.getByRole('button'));
    expect(addItem).toHaveBeenCalled();
    expect(formAction).toHaveBeenCalledWith({
      type: 'add',
      payload: {
        id: '1',
        name: 'Pizza',
        price: 10,
        image: '/pizza.jpg',
        category: 'Pizza',
      },
    });
  });

  it('should remove item from cart if already in cart', () => {
    const removeItem = jest.fn();
    const formAction = jest.fn();

    jest.spyOn(nextAuthReact, 'useSession').mockReturnValue({
      data: { user: { email: 'test@mail.com' }, expires: '' },
      status: 'authenticated',
      update: jest.fn(),
    });

    jest.spyOn(useCartStoreModule, 'useCartStore').mockReturnValue({
      items: [{ id: '1', name: 'Pizza', price: 10, quantity: 1 }],
      addItem: jest.fn(),
      removeItem,
    });

    (useCartActionModule.useCartAction as jest.Mock).mockReturnValue({
      formAction,
      isPending: false,
    });

    jest
      .spyOn(useTransitionModule, 'useTransition')
      .mockReturnValue([false, (cb: unknown) => (cb as () => void)()]);
    render(<RestaurantsCard {...mockProduct} />);
    fireEvent.click(screen.getByRole('button'));
    expect(removeItem).toHaveBeenCalledWith('1');
    expect(formAction).toHaveBeenCalledWith({ type: 'remove', payload: '1' });
  });

  it('should show Plus icon if not in cart, Minus if in cart', () => {
    jest.spyOn(nextAuthReact, 'useSession').mockReturnValue({
      data: { user: { email: 'test@mail.com' }, expires: '' },
      status: 'authenticated',
      update: jest.fn(),
    });

    jest.spyOn(useCartStoreModule, 'useCartStore').mockReturnValue({
      items: [],
      addItem: jest.fn(),
      removeItem: jest.fn(),
    });

    (useCartActionModule.useCartAction as jest.Mock).mockReturnValue({
      formAction: jest.fn(),
      isPending: false,
    });

    jest
      .spyOn(useTransitionModule, 'useTransition')
      .mockReturnValue([false, (cb: unknown) => (cb as () => void)()]);
    const { rerender } = render(<RestaurantsCard {...mockProduct} />);
    expect(screen.getByLabelText('Button add to cart')).toBeInTheDocument();

    jest.spyOn(useCartStoreModule, 'useCartStore').mockReturnValue({
      items: [{ id: '1', name: 'Pizza', price: 10, quantity: 1 }],
      addItem: jest.fn(),
      removeItem: jest.fn(),
    });
    rerender(<RestaurantsCard {...mockProduct} />);
    expect(
      screen.getByLabelText('Button remove from cart'),
    ).toBeInTheDocument();
  });

  it('should show short description if description is too long', () => {
    const longDesc = 'a'.repeat(70);

    jest.spyOn(nextAuthReact, 'useSession').mockReturnValue({
      data: null,
      status: 'unauthenticated',
      update: jest.fn(),
    });

    jest.spyOn(useCartStoreModule, 'useCartStore').mockReturnValue({
      items: [],
      addItem: jest.fn(),
      removeItem: jest.fn(),
    });

    (useCartActionModule.useCartAction as jest.Mock).mockReturnValue({
      formAction: jest.fn(),
      isPending: false,
    });

    jest
      .spyOn(useTransitionModule, 'useTransition')
      .mockReturnValue([false, (cb: unknown) => (cb as () => void)()]);
    render(<RestaurantsCard {...mockProduct} description={longDesc} />);
    expect(screen.getByText(`${longDesc.slice(0, 65)}...`)).toBeInTheDocument();
  });

  it('should link to product detail page', () => {
    jest.spyOn(nextAuthReact, 'useSession').mockReturnValue({
      data: null,
      status: 'unauthenticated',
      update: jest.fn(),
    });

    jest.spyOn(useCartStoreModule, 'useCartStore').mockReturnValue({
      items: [],
      addItem: jest.fn(),
      removeItem: jest.fn(),
    });

    (useCartActionModule.useCartAction as jest.Mock).mockReturnValue({
      formAction: jest.fn(),
      isPending: false,
    });

    jest
      .spyOn(useTransitionModule, 'useTransition')
      .mockReturnValue([false, (cb: unknown) => (cb as () => void)()]);
    render(<RestaurantsCard {...mockProduct} />);
    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      '/product-detail/1',
    );
  });
});
