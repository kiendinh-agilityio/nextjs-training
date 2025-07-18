import { render, screen } from '@testing-library/react';
import AccountInfoCard from './AccountInfoCard';

describe('AccountInfoCard', () => {
  const mockProps = {
    email: 'kien@example.com',
    phone: '0123456789',
    address: '123 Main St',
  };

  it('renders all account info items with correct labels and values', () => {
    render(<AccountInfoCard {...mockProps} />);
    expect(screen.getByText('Account Information')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText(mockProps.email)).toBeInTheDocument();
    expect(screen.getByText('Phone')).toBeInTheDocument();
    expect(screen.getByText(mockProps.phone)).toBeInTheDocument();
    expect(screen.getByText('Address')).toBeInTheDocument();
    expect(screen.getByText(mockProps.address)).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { asFragment } = render(<AccountInfoCard {...mockProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
