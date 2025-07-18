import { render } from '@testing-library/react';
import { ROUTERS } from '@/constants/router';
import LoginToast from './LoginToast';

// Mock next/link to render a simple anchor for snapshotting
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

// Mock sonner's toast function
const toastMock = jest.fn();
jest.mock('sonner', () => ({
  toast: (...args: unknown[]) => toastMock(...args),
}));

describe('LoginToast', () => {
  beforeEach(() => {
    toastMock.mockClear();
  });

  it('should call toast with correct JSX and options', () => {
    LoginToast();
    expect(toastMock).toHaveBeenCalledTimes(1);
    const [jsx, options] = toastMock.mock.calls[0];
    const { container } = render(jsx);
    expect(container).toMatchSnapshot();
    expect(options).toEqual({ duration: 3000 });
    const link = container.querySelector('a');
    expect(link).toBeTruthy();
    expect(link?.getAttribute('href')).toBe(ROUTERS.LOGIN);
    expect(link?.textContent).toMatch(/log in/i);
  });
});
