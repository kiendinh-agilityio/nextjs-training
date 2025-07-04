import { render } from '@testing-library/react';
import ContactSection from './ContactSection';

describe('ContactSection', () => {
  it('should render correctly and match snapshot', () => {
    const { asFragment } = render(<ContactSection />);
    expect(asFragment()).toMatchSnapshot();
  });
});
