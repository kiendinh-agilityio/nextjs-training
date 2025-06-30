import { AUTH_API_URL } from '@/constants/api-endpoint';

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
