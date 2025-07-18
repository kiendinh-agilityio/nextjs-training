import { render, screen } from '@testing-library/react';
import ProfileSkeleton from './ProfileSkeleton';

it('should match snapshot', () => {
  const { asFragment } = render(<ProfileSkeleton />);
  expect(asFragment()).toMatchSnapshot();
});

it('renders heading with text "Profile"', () => {
  render(<ProfileSkeleton />);
  const heading = screen.getByRole('heading', { name: /profile/i });
  expect(heading).toBeInTheDocument();
});

it('renders main container and sections', () => {
  render(<ProfileSkeleton />);
  expect(screen.getByRole('heading', { name: /profile/i })).toBeInTheDocument();
  expect(screen.getByText('Profile').closest('div')).toHaveClass('container');
});
