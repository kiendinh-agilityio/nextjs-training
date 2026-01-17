import { render, screen, fireEvent } from '@testing-library/react';
import { usePathname } from 'next/navigation';

import { NAV_LINKS } from '@/constants/nav-links';
import Navbar from './Navbar';

const mockUseSession = jest.fn();

jest.mock('next-auth/react', () => ({
  useSession: (
    ...args: Parameters<(typeof import('next-auth/react'))['useSession']>
  ) => mockUseSession(...args),
}));

jest.mock('@/components/common/ui/logo', () => ({
  Logo: (props: React.ComponentPropsWithoutRef<'div'>) => (
    <div data-testid="logo-mock" {...props} />
  ),
}));

jest.mock('@/components/common/ui/button', () => ({
  Button: ({
    children,
    ariaLabel,
    ...props
  }: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    ariaLabel?: string;
  }) => (
    <button data-testid="button-mock" aria-label={ariaLabel} {...props}>
      {children}
    </button>
  ),
}));

jest.mock('@/components/Icons/UserIcon', () => ({
  UserIcon: () => <svg data-testid="usericon-mock" />,
}));

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
}));

jest.mock('@/hooks/useUserProfile', () => ({
  useUserProfile: jest.fn(() => ({
    profile: null,
    status: 'unauthenticated',
  })),
}));

describe('Navbar', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (usePathname as jest.Mock).mockReturnValue('/');
    mockUseSession.mockReturnValue({
      data: null,
      status: 'unauthenticated',
    });
  });

  it('should match snapshot', () => {
    const { asFragment } = render(<Navbar />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders all nav links', () => {
    render(<Navbar />);

    NAV_LINKS.forEach((link) => {
      const el = screen.getAllByText(link.label)[0];
      expect(el).toBeInTheDocument();
    });
  });

  it('renders Login Page button', () => {
    render(<Navbar />);

    expect(screen.getAllByText(/login page/i)[0]).toBeInTheDocument();
  });

  it('opens and closes mobile menu', () => {
    render(<Navbar />);
    const hamburger = screen.getByLabelText(/toggle menu/i);
    fireEvent.click(hamburger);

    const navDrawer = screen.getByTestId('mobile-nav');
    expect(navDrawer).toHaveClass('translate-x-0');

    const closeBtn = screen.getByLabelText(/close menu/i);
    fireEvent.click(closeBtn);

    expect(navDrawer).toHaveClass('translate-x-full');
  });

  it('renders Login Page button when user is not logged in', () => {
    mockUseSession.mockReturnValue({
      data: null,
      status: 'unauthenticated',
    });
    render(<Navbar />);

    expect(screen.getAllByText(/login page/i)[0]).toBeInTheDocument();
  });

  it('renders loading skeleton when status is loading (desktop)', () => {
    mockUseSession.mockReturnValue({
      data: null,
      status: 'loading',
    });
    render(<Navbar />);

    expect(screen.getByTestId('desktop-skeleton')).toBeInTheDocument();
  });

  it('renders loading skeleton when status is loading (mobile)', () => {
    mockUseSession.mockReturnValue({
      data: null,
      status: 'loading',
    });
    render(<Navbar />);
    const hamburger = screen.getByLabelText(/toggle menu/i);
    fireEvent.click(hamburger);

    expect(screen.getByTestId('mobile-skeleton')).toBeInTheDocument();
  });
});
