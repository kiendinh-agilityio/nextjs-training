import { render } from '@testing-library/react';
import HeroSection from './HeroSection';

describe('HeroSection', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(<HeroSection />);
    expect(asFragment()).toMatchSnapshot();
  });
});
