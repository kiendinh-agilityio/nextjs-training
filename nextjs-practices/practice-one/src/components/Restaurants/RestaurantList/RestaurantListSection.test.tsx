import { render, screen, waitFor } from '@testing-library/react';
import RestaurantListSection from './RestaurantListSection';
import { getRestaurantList } from '@/actions/product';
import type { Product } from '@/types/product';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (
    props: React.ImgHTMLAttributes<HTMLImageElement> & { fill?: boolean },
  ) => {
    const { fill: _fill, alt = '', ...rest } = props;
    // eslint-disable-next-line @next/next/no-img-element
    return <img alt={alt} {...rest} />;
  },
}));

jest.mock('@/actions/product', () => ({
  getRestaurantList: jest.fn(),
}));

describe('RestaurantListSection', () => {
  const mockProducts: Product[] = [
    {
      id: '1',
      name: 'Pizza',
      description: 'Delicious pizza',
      price: '10',
      image: '/pizza.jpg',
      category: 'Burgers',
    },
    {
      id: '2',
      name: 'Sushi',
      description: 'Fresh sushi',
      price: '15',
      image: '/sushi.jpg',
      category: 'Fries',
    },
    {
      id: '3',
      name: 'Cola',
      description: 'Refreshing cola',
      price: '5',
      image: '/cola.jpg',
      category: 'Cold drinks',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    // Mock getRestaurantList to return products based on category
    (getRestaurantList as jest.Mock).mockImplementation((category?: string) => {
      if (!category) {
        return Promise.resolve(mockProducts);
      }
      return Promise.resolve(
        mockProducts.filter((p) => p.category === category),
      );
    });
  });

  it('renders RestaurantsCategoryList for a specific category', async () => {
    const { asFragment } = render(<RestaurantListSection category="Burgers" />);

    await waitFor(() => {
      expect(screen.getByText('Burgers')).toBeInTheDocument();
    });

    expect(asFragment()).toMatchSnapshot('specific category');
  });

  it('renders all categories when no category is selected', async () => {
    const { asFragment } = render(<RestaurantListSection />);

    await waitFor(() => {
      expect(screen.getByText('Burgers')).toBeInTheDocument();
      expect(screen.getByText('Fries')).toBeInTheDocument();
      expect(screen.getByText('Breakfast')).toBeInTheDocument();
    });

    expect(asFragment()).toMatchSnapshot('all categories');
  });

  it('renders all categories when category is "Offers"', async () => {
    const { asFragment } = render(<RestaurantListSection category="Offers" />);

    await waitFor(() => {
      expect(screen.getByText('Burgers')).toBeInTheDocument();
      expect(screen.getByText('Fries')).toBeInTheDocument();
      expect(screen.getByText('Breakfast')).toBeInTheDocument();
    });

    expect(asFragment()).toMatchSnapshot('offers category');
  });

  it('renders nothing if getRestaurantList returns empty', async () => {
    // Override the mock to return empty array
    (getRestaurantList as jest.Mock).mockResolvedValue([]);

    const { asFragment } = render(<RestaurantListSection />);

    await waitFor(() => {
      expect(screen.queryByText('Burgers')).not.toBeInTheDocument();
      expect(screen.queryByText('Fries')).not.toBeInTheDocument();
      expect(screen.queryByText('Breakfast')).not.toBeInTheDocument();
    });

    expect(asFragment()).toMatchSnapshot('empty data');
  });
});
