// src/app/api/coupons/[code]/route.test.ts

import { GET } from './route';
import { API_STATUS } from '@/constants/api-setup';
import { NextRequest } from 'next/server';

// Mock data file
jest.mock('@/data/coupons.json', () => ({
  coupons: [
    { code: 'SAVE10', discount: 10 },
    { code: 'SUMMER20', discount: 20 },
  ],
}));

// Mock NextResponse
jest.mock('next/server', () => {
  return {
    NextResponse: {
      json: jest.fn((data, init) => ({ data, status: init?.status || 200 })),
    },
  };
});

describe('GET /api/coupons/[code]', () => {
  it('returns coupon when found', async () => {
    const params = Promise.resolve({ code: 'SAVE10' });

    const response = await GET({} as NextRequest, { params });

    expect(response).toEqual({
      data: {
        coupon: { code: 'SAVE10', discount: 10 },
      },
      status: 200,
    });
  });

  it('returns 404 when coupon not found', async () => {
    const params = Promise.resolve({ code: 'INVALID' });

    const response = await GET({} as NextRequest, { params });

    expect(response).toEqual({
      data: { error: 'Coupon not found' },
      status: API_STATUS.NOT_FOUND,
    });
  });
});
