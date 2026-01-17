import { render } from '@testing-library/react';
import ProfileSkeleton from './ProfileSkeleton';

it('should match snapshot', () => {
  const { asFragment } = render(<ProfileSkeleton />);
  expect(asFragment()).toMatchSnapshot();
});
