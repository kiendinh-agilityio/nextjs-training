import { apiClient } from '@/lib/api-client';
import { User } from '@/types/user';

export const fetchProfile = async (
  email: string,
): Promise<{
  user: User | null;
  error: string | null;
}> => {
  if (!email) return { user: null, error: 'No email provided' };

  const response = await apiClient.getProfile(email);

  if (response.error) {
    return { user: null, error: response.error };
  }

  if (
    !response.data ||
    !Array.isArray(response.data) ||
    response.data.length === 0
  ) {
    return { user: null, error: 'User not found' };
  }

  return { user: response.data[0], error: null };
};

export const getUserFromApi = async (email: string, password: string) => {
  const response = await apiClient.getProfile(email);

  if (response.error) {
    return { error: 'Email or password is invalid' };
  }

  if (
    !response.data ||
    !Array.isArray(response.data) ||
    response.data.length === 0
  ) {
    return { error: 'Email or password is invalid' };
  }

  const user = response.data[0];
  if (user.password !== password) {
    return { error: 'Email or password is invalid' };
  }

  return user;
};
