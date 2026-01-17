import { render } from '@testing-library/react';
import RestaurantHeaderSection from './RestaurantHeaderSection';

describe('RestaurantHeaderSection (Restaurants)', () => {
  it('should match snapshot', () => {
    const { container } = render(<RestaurantHeaderSection />);

    expect(container).toMatchSnapshot();
  });
});
