import { render } from '@testing-library/react';
import PopularCategoriesSection from './PopularCategoriesSection';

describe('PopularCategoriesSection', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(<PopularCategoriesSection />);
    expect(asFragment()).toMatchSnapshot();
  });
});
