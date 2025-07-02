import { render } from '@testing-library/react';
import PopularRestaurantsSection from './PopularRestaurantsSection';

describe('PopularRestaurantsSection', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(<PopularRestaurantsSection />);

    expect(asFragment()).toMatchSnapshot();
  });
});
