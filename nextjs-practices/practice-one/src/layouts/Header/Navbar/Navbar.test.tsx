import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { usePathname } from 'next/navigation';

import { NAV_LINKS } from '@/constants/nav-links';
import Navbar from './Navbar';

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

jest.mock('next-auth/react', () => ({
  useSession: () => ({
    data: null,
    status: 'unauthenticated',
  }),
}));

describe('Navbar', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (usePathname as jest.Mock).mockReturnValue('/');
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

  it('renders Login/Signup button', () => {
    render(<Navbar />);
    expect(screen.getAllByText(/login\/signup/i)[0]).toBeInTheDocument();
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
});
