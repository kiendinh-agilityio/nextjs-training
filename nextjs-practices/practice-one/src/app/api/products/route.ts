import { NextRequest, NextResponse } from 'next/server';

// import constants
import {
  API_PARAMS,
  API_ERRORS,
  API_STATUS,
  PRODUCT_API_URL,
} from '@/constants/api-setup';

export const GET = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get(API_PARAMS.CATEGORY);

  if (!PRODUCT_API_URL) {
    return NextResponse.json(
      { error: API_ERRORS.PRODUCT_API_URL_NOT_CONFIGURED },
      { status: API_STATUS.INTERNAL_SERVER_ERROR },
    );
  }

  let url = PRODUCT_API_URL;
  if (category) {
    url += `?category=${encodeURIComponent(category)}`;
  }

  const response = await fetch(url, { cache: 'no-store' });

  if (!response.ok) {
    return NextResponse.json(
      { error: API_ERRORS.FAILED_TO_FETCH_PRODUCTS },
      { status: API_STATUS.INTERNAL_SERVER_ERROR },
    );
  }

  const data = await response.json();
  return NextResponse.json(data);
};
