import { render, screen, fireEvent } from '@testing-library/react';
import ErrorPage from './ErrorPage';

const mockBack = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    back: mockBack,
  }),
}));

describe('ErrorPage', () => {
  beforeEach(() => {
    mockBack.mockClear();
  });

  it('renders with default props', () => {
    const { asFragment } = render(<ErrorPage onRetry={jest.fn()} />);
    expect(screen.getByText('Oops! Something went wrong')).toBeInTheDocument();
    expect(
      screen.getByText('An unexpected error occurred. Please try again.'),
    ).toBeInTheDocument();
    expect(screen.getByText('Try again')).toBeInTheDocument();
    expect(screen.getByText('Go back')).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with custom title and message', () => {
    render(
      <ErrorPage
        title="Custom Error"
        message="Custom error message."
        onRetry={jest.fn()}
      />,
    );
    expect(screen.getByText('Custom Error')).toBeInTheDocument();
    expect(screen.getByText('Custom error message.')).toBeInTheDocument();
  });

  it('calls onRetry when Try again is clicked', () => {
    const onRetry = jest.fn();
    render(<ErrorPage onRetry={onRetry} />);
    fireEvent.click(screen.getByText('Try again'));
    expect(onRetry).toHaveBeenCalled();
  });

  it('calls router.back when Go back is clicked', () => {
    render(<ErrorPage onRetry={jest.fn()} />);
    fireEvent.click(screen.getByText('Go back'));
    expect(mockBack).toHaveBeenCalled();
  });
});
