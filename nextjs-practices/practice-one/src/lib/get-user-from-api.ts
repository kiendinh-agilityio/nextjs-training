import { AUTH_API_URL } from '@/constants/api-endpoint';
import { User } from '@/types/user';

export const fetchProfile = async (
  email: string,
): Promise<{
  user: User | null;
  error: string | null;
}> => {
  if (!email) return { user: null, error: 'No email provided' };
  try {
    const res = await fetch(
      `${AUTH_API_URL}?email=${encodeURIComponent(email)}`,
    );
    if (!res.ok) {
      return {
        user: null,
        error: `Failed to fetch profile: ${res.status} ${res.statusText}`,
      };
    }
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) {
      return { user: null, error: 'User not found' };
    }
    return { user: data[0], error: null };
  } catch (err: unknown) {
    return {
      user: null,
      error: err instanceof Error ? err.message : 'User not found',
    };
  }
};

export const getUserFromApi = async (email: string, password: string) => {
  try {
    const res = await fetch(
      `${AUTH_API_URL}?email=${encodeURIComponent(email)}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const data = await res.json();
    if (!res.ok || !Array.isArray(data) || data.length === 0) {
      return { error: 'Email or password is invalid' };
    }
    const user = data[0];
    if (user.password !== password) {
      return { error: 'Email or password is invalid' };
    }
    return user;
  } catch (error) {
    return { error: 'Email or password is invalid' };
  }
};
