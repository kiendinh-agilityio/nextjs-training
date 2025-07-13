import { render, screen, fireEvent } from '@testing-library/react';
import LoadMore from './LoadMore';

describe('LoadMore', () => {
  const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];
  const renderItem = (item: string) => <div data-testid="item">{item}</div>;

  it('renders initial items and button', () => {
    render(
      <LoadMore
        items={items}
        renderItem={renderItem}
        initialCount={2}
        step={2}
        buttonText="Show More"
      />,
    );
    expect(screen.getAllByTestId('item')).toHaveLength(2);

    expect(
      screen.getByRole('button', { name: 'Show More' }),
    ).toBeInTheDocument();
  });

  it('loads more items when button is clicked', () => {
    render(
      <LoadMore
        items={items}
        renderItem={renderItem}
        initialCount={2}
        step={2}
        buttonText="Show More"
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Show More' }));

    expect(screen.getAllByTestId('item')).toHaveLength(4);
  });

  it('hides button when all items are visible', () => {
    render(
      <LoadMore
        items={items}
        renderItem={renderItem}
        initialCount={4}
        step={2}
        buttonText="Show More"
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Show More' }));

    expect(screen.getAllByTestId('item')).toHaveLength(5);

    expect(
      screen.queryByRole('button', { name: 'Show More' }),
    ).not.toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { asFragment } = render(
      <LoadMore
        items={items}
        renderItem={renderItem}
        initialCount={3}
        step={2}
        buttonText="Show More"
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
