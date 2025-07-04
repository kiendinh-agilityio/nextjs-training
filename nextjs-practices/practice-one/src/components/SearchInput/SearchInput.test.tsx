import { render, screen } from '@testing-library/react';
import { SearchInput } from './SearchInput';

describe('SearchInput', () => {
  it('renders input with search icon and placeholder', () => {
    const { asFragment } = render(<SearchInput />);

    expect(
      screen.getByPlaceholderText('Search from menu...'),
    ).toBeInTheDocument();

    expect(asFragment()).toMatchSnapshot();
  });
});
