import { Coupon } from '@/types/cart';
import { Product } from '@/types/product';
import { User } from '@/types/user';
import {
  API_BASE_URL,
  API_ENDPOINTS,
  API_PARAMS,
  ENDPOINT_VALUES,
  AUTH_API_URL,
  API_ERRORS,
} from '@/constants/api-setup';

interface ApiResponse<T> {
  data?: T;
  error?: string;
}

class ApiClient {
  private readonly baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseUrl}${API_ENDPOINTS.V1}?${API_PARAMS.ENDPOINT}=${endpoint}`;
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return {
          error: errorData.error || `HTTP ${response.status}`,
        };
      }

      const data = await response.json();
      return { data };
    } catch (error) {
      return {
        error:
          error instanceof Error ? error.message : API_ERRORS.NETWORK_ERROR,
      };
    }
  }

  // Coupons API
  async getCoupons(): Promise<ApiResponse<{ coupons: Coupon[] }>> {
    return this.request<{ coupons: Coupon[] }>(ENDPOINT_VALUES.COUPONS);
  }

  // Products API
  async getProducts(category?: string): Promise<ApiResponse<Product[]>> {
    const url = category
      ? `${ENDPOINT_VALUES.PRODUCTS}&${API_PARAMS.CATEGORY}=${encodeURIComponent(category)}`
      : ENDPOINT_VALUES.PRODUCTS;
    return this.request<Product[]>(url);
  }

  async getProduct(id: string | number): Promise<ApiResponse<Product>> {
    return this.request<Product>(
      `${ENDPOINT_VALUES.PRODUCTS}&${API_PARAMS.ID}=${id}`,
    );
  }

  // Auth API
  async authenticate(credentials: {
    email: string;
    password: string;
  }): Promise<ApiResponse<User>> {
    return this.request<User>(ENDPOINT_VALUES.AUTH, {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async getProfile(email: string): Promise<ApiResponse<User[]>> {
    if (!AUTH_API_URL) {
      return { error: API_ERRORS.AUTH_API_URL_NOT_CONFIGURED };
    }

    try {
      const response = await fetch(
        `${AUTH_API_URL}?email=${encodeURIComponent(email)}`,
      );

      if (!response.ok) {
        return {
          error: `Failed to fetch profile: ${response.status} ${response.statusText}`,
        };
      }

      const data = await response.json();
      return { data };
    } catch (error) {
      return {
        error:
          error instanceof Error ? error.message : API_ERRORS.NETWORK_ERROR,
      };
    }
  }
}

// Export singleton instance
export const apiClient = new ApiClient();

// Export for testing
export { ApiClient };
