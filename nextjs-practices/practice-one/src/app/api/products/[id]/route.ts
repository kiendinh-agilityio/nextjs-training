import { NextRequest, NextResponse } from 'next/server';

// import constants
import { API_ERRORS, API_STATUS, PRODUCT_API_URL } from '@/constants/api-setup';

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  const { id } = await params;

  if (!PRODUCT_API_URL) {
    return NextResponse.json(
      { error: API_ERRORS.PRODUCT_API_URL_NOT_CONFIGURED },
      { status: API_STATUS.INTERNAL_SERVER_ERROR },
    );
  }

  const url = `${PRODUCT_API_URL}/${id}`;
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
