import { calculateDiscount, Coupon } from '../calculateDiscount';

describe('calculateDiscount', () => {
  it('should return correct discount and percent for a valid coupon', () => {
    const coupon: Coupon = { code: 'SALE10', discount: 10 };
    const result = calculateDiscount(200, coupon);
    expect(result).toEqual({ discount: 20, percent: 10 });
  });

  it('should return 0 discount for 0% coupon', () => {
    const coupon: Coupon = { code: 'FREE', discount: 0 };
    const result = calculateDiscount(200, coupon);
    expect(result).toEqual({ discount: 0, percent: 0 });
  });

  it('should round discount correctly', () => {
    const coupon: Coupon = { code: 'ODD', discount: 33 };
    const result = calculateDiscount(101, coupon);
    expect(result).toEqual({ discount: 33, percent: 33 });
  });

  it('should handle 100% discount', () => {
    const coupon: Coupon = { code: 'ALLFREE', discount: 100 };
    const result = calculateDiscount(150, coupon);
    expect(result).toEqual({ discount: 150, percent: 100 });
  });

  it('should return 0 discount for 0 subtotal', () => {
    const coupon: Coupon = { code: 'SALE10', discount: 10 };
    const result = calculateDiscount(0, coupon);
    expect(result).toEqual({ discount: 0, percent: 10 });
  });
});
