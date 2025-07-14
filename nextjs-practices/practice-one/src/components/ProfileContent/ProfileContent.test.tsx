import { render } from '@testing-library/react';
import ProfilePage from './ProfileContent';

import { useSession } from 'next-auth/react';

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
}));

jest.mock('@/components/common/ui/heading', () => ({
  Heading: ({
    children,
    ...props
  }: React.PropsWithChildren<Record<string, unknown>>) => (
    <h1 data-testid="heading-mock" {...props}>
      {children}
    </h1>
  ),
}));

jest.mock('@/components/common/ui/button', () => ({
  Button: ({
    children,
    ariaLabel,
    ...props
  }: React.PropsWithChildren<Record<string, unknown>>) => {
    const buttonProps = { ...props };
    if (ariaLabel) {
      (buttonProps as Record<string, unknown>)['aria-label'] = ariaLabel;
      delete (buttonProps as Record<string, unknown>).ariaLabel;
    }
    return (
      <button data-testid="button-mock" {...buttonProps}>
        {children}
      </button>
    );
  },
}));

jest.mock('@/components/common/ui/skeleton', () => ({
  Skeleton: (props: Record<string, unknown>) => (
    <div data-testid="skeleton-mock" {...props} />
  ),
}));

describe('ProfilePage UI', () => {
  const useSessionMock = useSession as jest.Mock;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render loading state and match snapshot', () => {
    useSessionMock.mockReturnValue({ status: 'loading' });
    const { asFragment } = render(<ProfilePage />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render nothing if no session or no email', () => {
    useSessionMock.mockReturnValue({
      status: 'authenticated',
      data: { user: {} },
    });
    const { asFragment } = render(<ProfilePage />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render profile info and logout button, match snapshot', () => {
    useSessionMock.mockReturnValue({
      status: 'authenticated',
      data: { user: { email: 'test@example.com' } },
    });
    const { asFragment } = render(<ProfilePage />);
    expect(asFragment()).toMatchSnapshot();
  });
});
