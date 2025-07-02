import { render } from '@testing-library/react';
import PromotionsSection from './PromotionsSection';

describe('PromotionsSection', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(<PromotionsSection />);

    expect(asFragment()).toMatchSnapshot();
  });
});
