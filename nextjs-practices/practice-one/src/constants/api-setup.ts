// API Base URLs
export const API_BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : process.env.NEXT_PUBLIC_BASE_URL;
export const AUTH_API_URL = process.env.NEXT_PUBLIC_AUTH_API_URL;
export const PRODUCT_API_URL = process.env.NEXT_PUBLIC_PRODUCT_API_URL;

// Unified API Endpoints
export const API_ENDPOINTS = {
  COMMERCE: '/api/commerce',
  AUTH: '/api/auth/[...nextauth]',
};

// API Query Parameters
export const API_PARAMS = {
  ENDPOINT: 'endpoint',
  CATEGORY: 'category',
  ID: 'id',
};

// API Endpoint Values
export const ENDPOINT_VALUES = {
  COUPONS: 'coupons',
  PRODUCTS: 'products',
  AUTH: 'auth',
};

// API Response Status Codes
export const API_STATUS = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  INTERNAL_SERVER_ERROR: 500,
};

// API Error Messages
export const API_ERRORS = {
  INVALID_ENDPOINT: 'Invalid endpoint',
  METHOD_NOT_ALLOWED: 'Method not allowed',
  FAILED_TO_FETCH_COUPONS: 'Failed to fetch coupons',
  FAILED_TO_FETCH_PRODUCTS: 'Failed to fetch products',
  AUTHENTICATION_FAILED: 'Authentication failed',
  PRODUCT_API_URL_NOT_CONFIGURED: 'Product API URL not configured',
  AUTH_API_URL_NOT_CONFIGURED: 'Auth API URL not configured',
  NETWORK_ERROR: 'Network error',
};
