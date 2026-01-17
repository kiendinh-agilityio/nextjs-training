import { render, screen, waitFor } from '@testing-library/react';
import { useSession } from 'next-auth/react';
import { fetchProfile } from '@/lib/get-user-from-api';
import { toast } from 'sonner';
import ProfileContent from './ProfileContent';
import { PROFILE_DATA } from '@/mocks/profile';

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

jest.mock('./ProfileSkeleton/ProfileSkeleton', () => ({
  __esModule: true,
  default: () => <div data-testid="profile-skeleton-mock" />,
}));

jest.mock('./ProfileHeader/ProfileHeader', () => ({
  __esModule: true,
  default: ({ avatarUrl, name }: { avatarUrl: string; name: string }) => (
    <div data-testid="profile-header-mock">
      {avatarUrl}-{name}
    </div>
  ),
}));

jest.mock('./AccountInfoCard/AccountInfoCard', () => ({
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

describe('ProfileContent', () => {
  const useSessionMock = useSession as jest.Mock;
  const fetchProfileMock = fetchProfile as jest.Mock;
  const toastErrorMock = toast.error as jest.Mock;

  beforeEach(() => {
    clearCartMock = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render loading state and match snapshot', () => {
    useSessionMock.mockReturnValue({ status: 'loading' });
    const { asFragment } = render(<ProfileContent />);
    expect(screen.getByTestId('profile-skeleton-mock')).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render skeleton if no session or no email', async () => {
    useSessionMock.mockReturnValue({
      status: 'authenticated',
      data: { user: {} },
    });
    fetchProfileMock.mockResolvedValue({ user: null, error: null });
    render(<ProfileContent />);
    expect(
      await screen.findByTestId('profile-skeleton-mock'),
    ).toBeInTheDocument();
  });

  it('should render profile info and logout button, match snapshot', async () => {
    useSessionMock.mockReturnValue({
      status: 'authenticated',
      data: { user: { email: 'test@example.com' } },
    });
    fetchProfileMock.mockResolvedValue({
      user: {
        email: PROFILE_DATA.email,
        phone: PROFILE_DATA.phone,
        address: PROFILE_DATA.address,
        avatar: PROFILE_DATA.avatarUrl,
        name: PROFILE_DATA.name,
      },
      error: null,
    });
    const { asFragment } = render(<ProfileContent />);
    await waitFor(() => {
      expect(screen.getByTestId('profile-header-mock')).toBeInTheDocument();
      expect(screen.getByTestId('account-info-card-mock')).toBeInTheDocument();
      expect(screen.getByTestId('button-mock')).toBeInTheDocument();
    });
    expect(asFragment()).toMatchSnapshot();
  });

  it('should call toast.error if fetchProfile returns error', async () => {
    useSessionMock.mockReturnValue({
      status: 'authenticated',
      data: { user: { email: 'test@example.com' } },
    });
    fetchProfileMock.mockResolvedValue({ user: null, error: 'Some error' });
    render(<ProfileContent />);
    await waitFor(() => {
      expect(toastErrorMock).toHaveBeenCalledWith('Some error');
    });
  });
});
