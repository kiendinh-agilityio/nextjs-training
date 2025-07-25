export interface Coupon {
  code: string;
  discount: number;
}

export const calculateDiscount = (
  subTotal: number,
  coupon: Coupon,
): { discount: number; percent: number } => {
  const discount = Math.round((subTotal * coupon.discount) / 100);

  return {
    discount,
    percent: coupon.discount,
  };
};
