import { render, screen, fireEvent } from '@testing-library/react';
import Error from '../error';

const mockBack = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    back: mockBack,
  }),
}));

describe('Error (Profile error page)', () => {
  it('renders with correct title and message', () => {
    const resetMock = jest.fn();
    const { asFragment } = render(<Error reset={resetMock} />);
    expect(screen.getByText('Profile Error')).toBeInTheDocument();
    expect(
      screen.getByText(
        'There was a problem loading your profile. Please try again.',
      ),
    ).toBeInTheDocument();
    expect(screen.getByText('Try again')).toBeInTheDocument();
    expect(screen.getByText('Go back')).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it('calls reset when Try again is clicked', () => {
    const resetMock = jest.fn();
    render(<Error reset={resetMock} />);
    fireEvent.click(screen.getByText('Try again'));
    expect(resetMock).toHaveBeenCalled();
  });
});
