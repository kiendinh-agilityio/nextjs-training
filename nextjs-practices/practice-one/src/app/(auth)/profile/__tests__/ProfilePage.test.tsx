// import test utility
import { render } from '@testing-library/react';

// import shared UI
import ProfilePage from '../page';

describe('ProfilePage UI', () => {
  it('should render ProfileContent and match snapshot', () => {
    const { asFragment } = render(<ProfilePage />);

    expect(asFragment()).toMatchSnapshot();
  });
});
