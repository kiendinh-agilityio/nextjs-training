import { render } from '@testing-library/react';
import ProfilePage from '../page';

describe('ProfilePage UI', () => {
  it('should render ProfileContent and match snapshot', () => {
    const { asFragment } = render(<ProfilePage />);

    expect(asFragment()).toMatchSnapshot();
  });
});
