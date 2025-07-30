import { NextResponse } from 'next/server';

export const GET = async () => {
  const couponsData = await import('@/data/coupons.json');

  return NextResponse.json(couponsData);
};
