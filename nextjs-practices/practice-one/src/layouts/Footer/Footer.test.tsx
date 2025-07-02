import React from 'react';
import { render } from '@testing-library/react';
import Footer from './footer';

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (
    props: React.ComponentProps<'img'> & { fill?: boolean; priority?: boolean },
  ) => {
    const { fill: _fill, priority: _priority, ...rest } = props;

    return <img {...rest} alt={props.alt || 'mocked image'} />;
  },
}));

// Mock next/link
jest.mock('next/link', () => {
  const MockLink = ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>;
  MockLink.displayName = 'MockLink';

  return MockLink;
});

describe('Footer', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(<Footer />);

    expect(asFragment()).toMatchSnapshot();
  });
});
