import { render } from '@testing-library/react';
import ContactInfo from './ContactInfo';

describe('ContactInfo', () => {
  it('should render correctly and match snapshot', () => {
    const items = [
      { key: '1', content: <span>Item 1</span> },
      { key: '2', content: <span>Item 2</span> },
    ];

    const { asFragment } = render(
      <ContactInfo
        icon={<svg data-testid="icon" />}
        title="Test Title"
        items={items}
        containerClassName="test-container"
        titleClassName="test-title"
        listClassName="test-list"
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
