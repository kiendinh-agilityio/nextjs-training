import { NextRequest, NextResponse } from 'next/server';
import { API_STATUS } from '@/constants/api-setup';

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> },
) => {
  const { code } = await params;

  // Import the coupons data directly
  const couponsData = await import('@/data/coupons.json');
  const { coupons } = couponsData;

  const coupon = coupons.find(
    (c: { code: string; discount: number }) => c.code === code,
  );

  if (!coupon) {
    return NextResponse.json(
      { error: 'Coupon not found' },
      { status: API_STATUS.NOT_FOUND },
    );
  }

  return NextResponse.json({ coupon });
};
