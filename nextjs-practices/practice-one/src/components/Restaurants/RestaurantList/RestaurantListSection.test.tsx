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
      category: 'Fast Food',
    },
    {
      id: '2',
      name: 'Sushi',
      description: 'Fresh sushi',
      price: '15',
      image: '/sushi.jpg',
      category: 'Japanese',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders RestaurantsCategoryList for a specific category', async () => {
    (getRestaurantList as jest.Mock).mockResolvedValue([]);

    const { asFragment } = render(
      <RestaurantListSection category="Fast Food" />,
    );

    await waitFor(() => {
      expect(screen.getByText('Fast Food')).toBeInTheDocument();
    });

    expect(asFragment()).toMatchSnapshot('specific category');
  });

  it('renders all categories when no category is selected', async () => {
    (getRestaurantList as jest.Mock).mockResolvedValue(mockProducts);

    const { asFragment } = render(<RestaurantListSection />);

    await waitFor(() => {
      expect(screen.getByText('Fast Food')).toBeInTheDocument();
      expect(screen.getByText('Japanese')).toBeInTheDocument();
    });

    expect(asFragment()).toMatchSnapshot('all categories');
  });

  it('renders all categories when category is "Offers"', async () => {
    (getRestaurantList as jest.Mock).mockResolvedValue(mockProducts);

    const { asFragment } = render(<RestaurantListSection category="Offers" />);

    await waitFor(() => {
      expect(screen.getByText('Fast Food')).toBeInTheDocument();
      expect(screen.getByText('Japanese')).toBeInTheDocument();
    });

    expect(asFragment()).toMatchSnapshot('offers category');
  });

  it('renders nothing if getRestaurantList returns empty', async () => {
    (getRestaurantList as jest.Mock).mockResolvedValue([]);

    const { asFragment } = render(<RestaurantListSection />);

    await waitFor(() => {
      expect(screen.queryByText('Fast Food')).not.toBeInTheDocument();
      expect(screen.queryByText('Japanese')).not.toBeInTheDocument();
    });

    expect(asFragment()).toMatchSnapshot('empty data');
  });
});
