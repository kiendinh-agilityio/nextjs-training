import { render, screen } from '@testing-library/react';
import Loading from '../loading';

jest.mock(
  '@/components/ProfileContent/ProfileSkeleton/ProfileSkeleton',
  () => ({
    __esModule: true,
    default: () => <div data-testid="profile-skeleton" />,
  }),
);

describe('Loading (Profile loading page)', () => {
  it('renders ProfileSkeleton', () => {
    render(<Loading />);
    expect(screen.getByTestId('profile-skeleton')).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { container } = render(<Loading />);
    expect(container).toMatchSnapshot();
  });
});
