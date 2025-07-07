import { render, screen, waitFor } from '@testing-library/react';
import type { Product } from '@/types/product';
import { getRestaurantList } from '@/actions/product';
import RestaurantsCategoryList from './RestaurantsCategoryList';

// Mock next/image
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

// Mock getRestaurantList from '@/actions/product'
jest.mock('@/actions/product', () => ({
  getRestaurantList: jest.fn(),
}));

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
    name: 'Burger',
    description: 'Juicy burger',
    price: '8',
    image: '/burger.jpg',
    category: 'Fast Food',
  },
];

describe('RestaurantsCategoryList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('displays heading and product list after loading', async () => {
    (getRestaurantList as jest.Mock).mockResolvedValue(mockProducts);

    const { asFragment } = render(
      <RestaurantsCategoryList category="Fast Food" />,
    );

    await waitFor(() => {
      expect(screen.getByText('Fast Food')).toBeInTheDocument();
    });

    expect(screen.getByText('Pizza')).toBeInTheDocument();
    expect(screen.getByText('Burger')).toBeInTheDocument();
    expect(screen.getAllByRole('img').length).toBeGreaterThanOrEqual(2);
    expect(asFragment()).toMatchSnapshot();
  });

  it('displays a maximum of 6 products', async () => {
    const manyProducts = Array.from({ length: 10 }).map((_, i) => ({
      id: String(i),
      name: `Product ${i}`,
      description: 'desc',
      price: '1',
      image: '/img.jpg',
      category: 'Fast Food',
    }));
    (getRestaurantList as jest.Mock).mockResolvedValue(manyProducts);

    render(<RestaurantsCategoryList category="Fast Food" />);

    await waitFor(() => {
      expect(screen.getByText('Fast Food')).toBeInTheDocument();
    });

    expect(screen.getAllByRole('img').length).toBe(6);
  });

  it('displays correctly when there are no products', async () => {
    (getRestaurantList as jest.Mock).mockResolvedValue([]);

    const { asFragment } = render(
      <RestaurantsCategoryList category="Fast Food" />,
    );

    await waitFor(() => {
      expect(screen.getByText('Fast Food')).toBeInTheDocument();
    });

    expect(screen.queryAllByRole('img').length).toBe(0);
    expect(asFragment()).toMatchSnapshot();
  });
});
