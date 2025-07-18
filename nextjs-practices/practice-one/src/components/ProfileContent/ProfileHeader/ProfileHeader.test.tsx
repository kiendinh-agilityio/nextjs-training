import { render, screen } from '@testing-library/react';
import ProfileHeader from './ProfileHeader';

const mockProps = {
  avatarUrl: '/test-avatar.png',
  name: 'John Doe',
};

describe('ProfileHeader', () => {
  it('renders without crashing and matches snapshot', () => {
    const { container } = render(<ProfileHeader {...mockProps} />);
    expect(container).toMatchSnapshot();
  });

  it('renders the avatar image with correct src and alt', () => {
    render(<ProfileHeader {...mockProps} />);
    const image = screen.getByAltText('Avatar');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src');
    expect(image.getAttribute('src')).toContain(
      mockProps.avatarUrl.replace(/^\//, ''),
    );
  });

  it('renders the correct greeting with name', () => {
    render(<ProfileHeader {...mockProps} />);
    expect(screen.getByText(`Hello, ${mockProps.name}`)).toBeInTheDocument();
  });

  it('renders the subtitle text', () => {
    render(<ProfileHeader {...mockProps} />);
    expect(screen.getByText('Ready for your next meal?')).toBeInTheDocument();
  });
});
