import { fetchGroupedRestaurantCategories } from '../services';
import { getRestaurantList } from '@/actions/product';
import { groupProductsByCategory } from '@/utils/groupProductsByCategory';
import { getOrderedCategories } from '@/utils/getOrderedCategories';
import { Product } from '@/types/product';

jest.mock('@/actions/product', () => ({
  getRestaurantList: jest.fn(),
}));
jest.mock('@/utils/groupProductsByCategory', () => ({
  groupProductsByCategory: jest.fn(),
}));
jest.mock('@/utils/getOrderedCategories', () => ({
  getOrderedCategories: jest.fn(),
}));

describe('fetchGroupedRestaurantCategories', () => {
  const mockProducts: Product[] = [
    { id: '1', name: 'Pizza', category: 'Burgers' } as Product,
    { id: '2', name: 'Fries', category: 'Fries' } as Product,
  ];
  const mockGrouped = [
    ['Burgers', [mockProducts[0]]],
    ['Fries', [mockProducts[1]]],
  ];
  const mockOrdered = [
    ['Burgers', [mockProducts[0]]],
    ['Fries', [mockProducts[1]]],
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (getRestaurantList as jest.Mock).mockResolvedValue(mockProducts);
    (groupProductsByCategory as jest.Mock).mockReturnValue(mockGrouped);
    (getOrderedCategories as jest.Mock).mockReturnValue(mockOrdered);
  });

  it('calls getRestaurantList with undefined if category is not provided', async () => {
    await fetchGroupedRestaurantCategories();
    expect(getRestaurantList).toHaveBeenCalledWith(undefined);
  });

  it('calls getRestaurantList with undefined if category is "Offers"', async () => {
    await fetchGroupedRestaurantCategories('Offers');
    expect(getRestaurantList).toHaveBeenCalledWith(undefined);
  });

  it('calls getRestaurantList with category if category is not "Offers"', async () => {
    await fetchGroupedRestaurantCategories('Burgers');
    expect(getRestaurantList).toHaveBeenCalledWith('Burgers');
  });

  it('returns ordered categories', async () => {
    const result = await fetchGroupedRestaurantCategories('Burgers');
    expect(groupProductsByCategory).toHaveBeenCalledWith(mockProducts);
    expect(getOrderedCategories).toHaveBeenCalledWith(
      mockGrouped,
      expect.anything(),
    );
    expect(result).toBe(mockOrdered);
  });
});
