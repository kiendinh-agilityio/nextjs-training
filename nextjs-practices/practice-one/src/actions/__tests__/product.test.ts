import type { Product } from '@/types/product';

const OLD_ENV = process.env;

describe('product actions', () => {
  const NEXT_PUBLIC_PRODUCT_API_URL = 'https://api.example.com/products';
  const mockProducts: Product[] = [
    {
      id: 1,
      name: 'Pizza',
      description: 'Delicious pizza',
      price: '10.00',
      image: '/pizza.jpg',
      category: 'Italian',
      rating: '4.5',
      ingredients: ['cheese', 'tomato'],
    },
    {
      id: 2,
      name: 'Burger',
      description: 'Juicy burger',
      price: '8.00',
      image: '/burger.jpg',
      category: 'American',
    },
  ];
  const mockProduct: Product = mockProducts[0];

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV, NEXT_PUBLIC_PRODUCT_API_URL };
    global.fetch = jest.fn();
  });

  afterAll(() => {
    process.env = OLD_ENV;
    jest.resetModules();
    jest.clearAllMocks();
  });

  describe('getRestaurantList', () => {
    it('fetches products without category', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockProducts,
      });
      // Import after setting env and resetting modules
      const { getRestaurantList } = await import('../product');
      const result = await getRestaurantList();
      expect(global.fetch).toHaveBeenCalledWith(NEXT_PUBLIC_PRODUCT_API_URL, {
        cache: 'no-store',
      });
      expect(result).toEqual(mockProducts);
    });

    it('fetches products with category', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockProducts,
      });
      const category = 'Italian';
      const url = `${NEXT_PUBLIC_PRODUCT_API_URL}?category=Italian`;
      const { getRestaurantList } = await import('../product');
      const result = await getRestaurantList(category);
      expect(global.fetch).toHaveBeenCalledWith(url, { cache: 'no-store' });
      expect(result).toEqual(mockProducts);
    });

    it('throws error if fetch fails', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: false });
      const { getRestaurantList } = await import('../product');
      await expect(getRestaurantList()).rejects.toThrow(
        'Failed to fetch foods',
      );
    });
  });

  describe('getProductDetail', () => {
    it('fetches product detail by id', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockProduct,
      });
      const { getProductDetail } = await import('../product');
      const result = await getProductDetail(mockProduct.id);
      expect(global.fetch).toHaveBeenCalledWith(
        `${NEXT_PUBLIC_PRODUCT_API_URL}/${mockProduct.id}`,
        { cache: 'no-store' },
      );
      expect(result).toEqual(mockProduct);
    });

    it('throws error if fetch fails', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: false });
      const { getProductDetail } = await import('../product');
      await expect(getProductDetail(mockProduct.id)).rejects.toThrow(
        'Failed to fetch product detail',
      );
    });
  });
});
