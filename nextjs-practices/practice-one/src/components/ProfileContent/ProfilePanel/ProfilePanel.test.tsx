import { render, screen, waitFor } from '@testing-library/react';
import { useSession } from 'next-auth/react';
import { fetchProfile } from '@/lib/get-user-from-api';
import { toast } from 'sonner';
import ProfilePanel from './ProfilePanel';

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
  signOut: jest.fn(),
}));

let clearCartMock = jest.fn();
jest.mock('@/stores/useCartStore', () => ({
  useCartStore: () => ({ clearCart: clearCartMock }),
}));

jest.mock('@/lib/get-user-from-api', () => ({
  fetchProfile: jest.fn(),
}));

jest.mock('sonner', () => ({
  toast: { error: jest.fn() },
}));

jest.mock('../ProfileSkeleton/ProfileSkeleton', () => ({
  __esModule: true,
  default: () => <div data-testid="profile-skeleton-mock" />,
}));

jest.mock('../ProfileHeader/ProfileHeader', () => ({
  __esModule: true,
  default: ({ avatarUrl, name }: { avatarUrl: string; name: string }) => (
    <div data-testid="profile-header-mock">
      {avatarUrl}-{name}
    </div>
  ),
}));

jest.mock('../AccountInfoCard/AccountInfoCard', () => ({
  __esModule: true,
  default: ({
    email,
    phone,
    address,
  }: {
    email: string;
    phone: string;
    address: string;
  }) => (
    <div data-testid="account-info-card-mock">
      {email}-{phone}-{address}
    </div>
  ),
}));

jest.mock('../ProfileActions/ProfileActions', () => ({
  __esModule: true,
  default: ({
    onLogout,
    isLoggingOut,
  }: {
    onLogout: () => void;
    isLoggingOut: boolean;
  }) => (
    <button
      data-testid="profile-actions-mock"
      onClick={onLogout}
      disabled={isLoggingOut}
    >
      Logout
    </button>
  ),
}));

describe('ProfilePanel', () => {
  const useSessionMock = useSession as jest.Mock;
  const fetchProfileMock = fetchProfile as jest.Mock;
  const toastErrorMock = toast.error as jest.Mock;

  beforeEach(() => {
    clearCartMock = jest.fn();
    jest.clearAllMocks();
  });

  it('renders loading state', () => {
    useSessionMock.mockReturnValue({ status: 'loading' });
    const { asFragment } = render(<ProfilePanel />);
    expect(screen.getByTestId('profile-skeleton-mock')).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders skeleton if loadingProfile is true', () => {
    useSessionMock.mockReturnValue({
      status: 'authenticated',
      data: { user: { email: 'test@example.com' } },
    });
    fetchProfileMock.mockResolvedValue({ user: null, error: null });
    const { asFragment } = render(<ProfilePanel />);
    expect(screen.getByTestId('profile-skeleton-mock')).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders null if no profile', async () => {
    useSessionMock.mockReturnValue({
      status: 'authenticated',
      data: { user: { email: 'test@example.com' } },
    });
    fetchProfileMock.mockResolvedValue({ user: null, error: null });
    const { container } = render(<ProfilePanel />);
    await waitFor(() => {
      expect(container.innerHTML).toBe('');
    });
  });

  it('renders profile info and actions', async () => {
    useSessionMock.mockReturnValue({
      status: 'authenticated',
      data: { user: { email: 'test@example.com' } },
    });
    fetchProfileMock.mockResolvedValue({
      user: {
        email: 'test@example.com',
        phone: '123',
        address: 'abc',
        avatar: 'avatar.png',
        name: 'Test',
      },
      error: null,
    });
    const { asFragment } = render(<ProfilePanel />);
    await waitFor(() => {
      expect(screen.getByTestId('profile-header-mock')).toBeInTheDocument();
      expect(screen.getByTestId('account-info-card-mock')).toBeInTheDocument();
      expect(screen.getByTestId('profile-actions-mock')).toBeInTheDocument();
    });
    expect(asFragment()).toMatchSnapshot();
  });

  it('calls toast.error if fetchProfile returns error', async () => {
    useSessionMock.mockReturnValue({
      status: 'authenticated',
      data: { user: { email: 'test@example.com' } },
    });
    fetchProfileMock.mockResolvedValue({ user: null, error: 'Some error' });
    render(<ProfilePanel />);
    await waitFor(() => {
      expect(toastErrorMock).toHaveBeenCalledWith('Some error');
    });
  });
});
