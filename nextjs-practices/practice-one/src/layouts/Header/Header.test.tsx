import { render, screen } from '@testing-library/react';
import Header from './header';

jest.mock('@/components/common/ui/logo', () => ({
  Logo: (props: React.ComponentProps<'div'>) => (
    <div data-testid="logo-mock" {...props} />
  ), // use specific type
}));

jest.mock('./Navbar/Navbar', () => {
  const NavbarMock = () => <nav data-testid="navbar-mock" />;
  NavbarMock.displayName = 'NavbarMock';
  return NavbarMock;
});

jest.mock('./HeaderInfoBar/HeaderInfoBar', () => {
  const HeaderInfoBarMock = () => <div data-testid="headerinfobar-mock" />;
  HeaderInfoBarMock.displayName = 'HeaderInfoBarMock';
  return HeaderInfoBarMock;
});

describe('Header', () => {
  it('renders Logo', () => {
    render(<Header />);
    expect(screen.getByTestId('logo-mock')).toBeInTheDocument();
  });

  it('renders Navbar and HeaderInfoBar', () => {
    render(<Header />);
    expect(screen.getByTestId('navbar-mock')).toBeInTheDocument();
    expect(screen.getByTestId('headerinfobar-mock')).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { asFragment } = render(<Header />);
    expect(asFragment()).toMatchSnapshot();
  });
});
