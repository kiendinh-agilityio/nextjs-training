import { render, screen, fireEvent } from '@testing-library/react';
import ProfileActions from './ProfileActions';

describe('ProfileActions', () => {
  const onLogoutMock = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render Logout button with correct text when not logging out', () => {
    render(<ProfileActions onLogout={onLogoutMock} isLoggingOut={false} />);
    const button = screen.getByRole('button', { name: /logout/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Logout');
    expect(button).not.toBeDisabled();
  });

  it('should render button with "Logging out..." text and disabled when isLoggingOut is true', () => {
    render(<ProfileActions onLogout={onLogoutMock} isLoggingOut={true} />);
    const button = screen.getByRole('button', { name: /logout/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Logging out...');
    expect(button).toBeDisabled();
  });

  it('should call onLogout when Logout button is clicked', () => {
    render(<ProfileActions onLogout={onLogoutMock} isLoggingOut={false} />);
    const button = screen.getByRole('button', { name: /logout/i });
    fireEvent.click(button);
    expect(onLogoutMock).toHaveBeenCalledTimes(1);
  });

  it('should match snapshot when not logging out', () => {
    const { asFragment } = render(
      <ProfileActions onLogout={onLogoutMock} isLoggingOut={false} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should match snapshot when logging out', () => {
    const { asFragment } = render(
      <ProfileActions onLogout={onLogoutMock} isLoggingOut={true} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
