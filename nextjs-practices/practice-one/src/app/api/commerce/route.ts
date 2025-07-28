import { NextRequest, NextResponse } from 'next/server';
import {
  API_PARAMS,
  ENDPOINT_VALUES,
  API_STATUS,
  API_ERRORS,
  PRODUCT_API_URL,
} from '@/constants/api-setup';

export const GET = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const endpoint = searchParams.get(API_PARAMS.ENDPOINT);

  switch (endpoint) {
    case ENDPOINT_VALUES.COUPONS:
      return await handleCoupons();
    case ENDPOINT_VALUES.PRODUCTS:
      return await handleProducts(request);
    case ENDPOINT_VALUES.AUTH:
      return await handleAuth(request);
    default:
      return NextResponse.json(
        { error: API_ERRORS.INVALID_ENDPOINT },
        { status: API_STATUS.BAD_REQUEST },
      );
  }
};

export const POST = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const endpoint = searchParams.get(API_PARAMS.ENDPOINT);

  if (endpoint === ENDPOINT_VALUES.AUTH) {
    return await handleAuth(request);
  }

  return NextResponse.json(
    { error: API_ERRORS.INVALID_ENDPOINT },
    { status: API_STATUS.BAD_REQUEST },
  );
};

// Coupons handler
const handleCoupons = async () => {
  try {
    // Import the coupons data directly
    const couponsData = await import('@/data/coupons.json');

    return NextResponse.json(couponsData);
  } catch (error) {
    return NextResponse.json(
      { error: API_ERRORS.FAILED_TO_FETCH_COUPONS },
      { status: API_STATUS.INTERNAL_SERVER_ERROR },
    );
  }
};

// Products handler
const handleProducts = async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get(API_PARAMS.CATEGORY);
    const id = searchParams.get(API_PARAMS.ID);

    if (!PRODUCT_API_URL) {
      return NextResponse.json(
        { error: API_ERRORS.PRODUCT_API_URL_NOT_CONFIGURED },
        { status: API_STATUS.INTERNAL_SERVER_ERROR },
      );
    }

    let url = PRODUCT_API_URL;
    if (id) {
      url += `/${id}`;
    } else if (category) {
      url += `?category=${encodeURIComponent(category)}`;
    }

    const response = await fetch(url, { cache: 'no-store' });

    if (!response.ok) {
      throw new Error(API_ERRORS.FAILED_TO_FETCH_PRODUCTS);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: API_ERRORS.FAILED_TO_FETCH_PRODUCTS },
      { status: API_STATUS.INTERNAL_SERVER_ERROR },
    );
  }
};

// Auth handler
const handleAuth = async (request: NextRequest) => {
  try {
    const { handlers } = await import('@/lib/auth');

    if (request.method === 'GET') {
      return await handlers.GET(request);
    } else if (request.method === 'POST') {
      return await handlers.POST(request);
    }

    return NextResponse.json(
      { error: API_ERRORS.METHOD_NOT_ALLOWED },
      { status: API_STATUS.METHOD_NOT_ALLOWED },
    );
  } catch (error) {
    return NextResponse.json(
      { error: API_ERRORS.AUTHENTICATION_FAILED },
      { status: API_STATUS.INTERNAL_SERVER_ERROR },
    );
  }
};
