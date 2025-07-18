import { render, screen } from '@testing-library/react';
import { useSearchParams } from 'next/navigation';
import { CATEGORIES_ITEM } from '@/constants/restaurants-data';
import CategorySection from './CategorySection';

// Mock useSearchParams
jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(),
}));

describe('CategorySection', () => {
  beforeEach(() => {
    (useSearchParams as jest.Mock).mockReturnValue({ get: () => null });
  });

  it('renders without crashing', () => {
    render(<CategorySection />);
    expect(screen.getByText('Offers')).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { asFragment } = render(<CategorySection />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders all categories as links', () => {
    render(<CategorySection />);
    CATEGORIES_ITEM.forEach((category) => {
      expect(screen.getByText(category)).toBeInTheDocument();
      expect(screen.getByText(category).closest('a')).toHaveAttribute('href');
    });
  });

  it('sets correct href for each category', () => {
    render(<CategorySection />);
    CATEGORIES_ITEM.forEach((category) => {
      const link = screen.getByText(category).closest('a');
      if (category === 'Offers') {
        expect(link).toHaveAttribute('href', '/restaurant');
      } else {
        expect(link).toHaveAttribute(
          'href',
          `/restaurant?category=${encodeURIComponent(category)}`,
        );
      }
    });
  });

  it('highlights the active category', () => {
    (useSearchParams as jest.Mock).mockReturnValue({ get: () => 'Fries' });
    render(<CategorySection />);
    const active = screen.getByText('Fries');
    expect(active).toHaveClass('bg-[#0a0a16]');
  });
});
