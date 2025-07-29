import { render, screen } from '@testing-library/react';
import NotFound from '../not-found';

describe('NotFound (product detail not found page)', () => {
  it('renders with correct title and message', () => {
    const { asFragment } = render(<NotFound />);
    expect(screen.getByText('404 - Product Not Found')).toBeInTheDocument();
    expect(
      screen.getByText(
        'We couldn’t find the product you are looking for. Please check the URL or return to the restaurant list.',
      ),
    ).toBeInTheDocument();
    expect(screen.getByText('Return to Restaurants')).toBeInTheDocument();
    expect(screen.getByText('Go Home')).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it('has correct links', () => {
    render(<NotFound />);
    const returnLink = screen.getByRole('link', {
      name: 'Return to Restaurants',
    });
    const homeLink = screen.getByRole('link', { name: 'Go Home' });

    expect(returnLink).toHaveAttribute('href', '/restaurant');
    expect(homeLink).toHaveAttribute('href', '/');
  });
});
