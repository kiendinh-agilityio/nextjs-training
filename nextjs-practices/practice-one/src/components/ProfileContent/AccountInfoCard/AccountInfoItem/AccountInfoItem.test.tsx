import { render, screen } from '@testing-library/react';
import AccountInfoItem from './AccountInfoItem';

describe('AccountInfoItem', () => {
  it('renders the label and value correctly', () => {
    render(<AccountInfoItem label="Username" value="kien123" />);
    expect(screen.getByText('Username')).toBeInTheDocument();
    expect(screen.getByText('kien123')).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { asFragment } = render(
      <AccountInfoItem label="Email" value="kien@example.com" />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
