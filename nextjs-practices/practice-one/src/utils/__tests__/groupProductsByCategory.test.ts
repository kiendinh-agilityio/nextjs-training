import { groupProductsByCategory } from '../groupProductsByCategory';
import type { Product } from '@/types/product';

describe('groupProductsByCategory', () => {
  it('returns empty array if products is empty', () => {
    expect(groupProductsByCategory([])).toEqual([]);
  });

  it('groups products by category', () => {
    const products: Product[] = [
      {
        id: '1',
        name: 'A',
        description: '',
        price: '',
        image: '',
        category: 'Cat1',
      },
      {
        id: '2',
        name: 'B',
        description: '',
        price: '',
        image: '',
        category: 'Cat2',
      },
      {
        id: '3',
        name: 'C',
        description: '',
        price: '',
        image: '',
        category: 'Cat1',
      },
    ];
    const result = groupProductsByCategory(products);
    expect(result).toEqual([
      ['Cat1', [products[0], products[2]]],
      ['Cat2', [products[1]]],
    ]);
    expect(result).toMatchSnapshot();
  });

  it('handles products with missing category gracefully', () => {
    const products = [
      {
        id: '1',
        name: 'A',
        description: '',
        price: '',
        image: '',
        category: undefined,
      },
      {
        id: '2',
        name: 'B',
        description: '',
        price: '',
        image: '',
        category: null,
      },
      {
        id: '3',
        name: 'C',
        description: '',
        price: '',
        image: '',
        category: 'Cat1',
      },
    ];
    const result = groupProductsByCategory(products as unknown as Product[]);
    expect(result).toEqual([
      [undefined, [products[0]]],
      [null, [products[1]]],
      ['Cat1', [products[2]]],
    ]);
  });
});
