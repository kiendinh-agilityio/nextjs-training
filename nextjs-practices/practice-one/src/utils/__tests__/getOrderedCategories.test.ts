import { getOrderedCategories } from '../getOrderedCategories';
import type { Product } from '@/types/product';

describe('getOrderedCategories', () => {
  const prodA: Product = {
    id: '1',
    name: 'A',
    description: '',
    price: '',
    image: '',
    category: 'A',
  };
  const prodB: Product = {
    id: '2',
    name: 'B',
    description: '',
    price: '',
    image: '',
    category: 'B',
  };
  const prodC: Product = {
    id: '3',
    name: 'C',
    description: '',
    price: '',
    image: '',
    category: 'Offers',
  };
  const prodS: Product = {
    id: '4',
    name: 'D',
    description: '',
    price: '',
    image: '',
    category: 'Special',
  };

  it('returns empty array if categoryOrder is empty', () => {
    expect(
      getOrderedCategories(
        [
          ['A', [prodA]],
          ['B', [prodB]],
        ],
        [],
      ),
    ).toEqual([]);
  });

  it('returns empty array if categories is empty', () => {
    expect(getOrderedCategories([], ['A', 'B'])).toEqual([
      ['A', []],
      ['B', []],
    ]);
  });

  it('excludes the excludeCategory from result', () => {
    const categories: [string, Product[]][] = [
      ['A', [prodA]],
      ['B', [prodB]],
      ['Offers', [prodC]],
    ];
    const order = ['A', 'B', 'Offers'];
    expect(getOrderedCategories(categories, order)).toEqual([
      ['A', [prodA]],
      ['B', [prodB]],
    ]);
  });

  it('returns empty array for category in order but not in categories', () => {
    const categories: [string, Product[]][] = [['A', [prodA]]];
    const order = ['A', 'B'];
    expect(getOrderedCategories(categories, order)).toEqual([
      ['A', [prodA]],
      ['B', []],
    ]);
  });

  it('supports custom excludeCategory', () => {
    const categories: [string, Product[]][] = [
      ['A', [prodA]],
      ['B', [prodB]],
      ['Special', [prodS]],
    ];
    const order = ['A', 'B', 'Special'];
    expect(getOrderedCategories(categories, order, 'Special')).toEqual([
      ['A', [prodA]],
      ['B', [prodB]],
    ]);
  });

  it('matches snapshot for normal case', () => {
    const categories: [string, Product[]][] = [
      ['A', [prodA]],
      ['B', [prodB]],
    ];
    const order = ['A', 'B'];
    expect(getOrderedCategories(categories, order)).toMatchSnapshot();
  });
});
