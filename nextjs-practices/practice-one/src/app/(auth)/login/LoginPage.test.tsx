import { ReactNode, HTMLAttributes } from 'react';
import { render } from '@testing-library/react';
import LoginPage from './page';

jest.mock('@/components/common/ui/logo', () => ({
  Logo: (props: HTMLAttributes<HTMLDivElement>) => (
    <div data-testid="logo-mock" {...props} />
  ),
}));

jest.mock('@/components/common/ui/heading', () => ({
  Heading: ({
    children,
    ...props
  }: { children?: ReactNode } & HTMLAttributes<HTMLHeadingElement>) => (
    <h2 data-testid="heading-mock" {...props}>
      {children}
    </h2>
  ),
}));

jest.mock('@/components/Auth/LoginForm', () => ({
  __esModule: true,
  default: () => <form data-testid="login-form-mock" />,
}));

describe('LoginPage', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(<LoginPage />);
    expect(asFragment()).toMatchSnapshot();
  });
});
