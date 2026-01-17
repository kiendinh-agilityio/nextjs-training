import { render } from '@testing-library/react';
import HeroSection from './HeroSection';

describe('HeroSection (Restaurants)', () => {
  it('should match snapshot', () => {
    const { container } = render(<HeroSection />);

    expect(container).toMatchSnapshot();
  });
});
