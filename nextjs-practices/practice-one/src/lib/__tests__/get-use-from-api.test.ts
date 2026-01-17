import { getUserFromApi, fetchProfile } from '../get-user-from-api';

// Mock the API client
jest.mock('@/lib/api-client', () => ({
  apiClient: {
    getProfile: jest.fn(),
  },
}));

import { apiClient } from '@/lib/api-client';

describe('getUserFromApi', () => {
  const mockUser = {
    id: '1',
    email: 'test@example.com',
    password: 'Password1!',
    name: 'Test User',
  };

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return user if credentials are valid', async () => {
    (apiClient.getProfile as jest.Mock).mockResolvedValue({
      data: [mockUser],
      error: undefined,
    });

    const result = await getUserFromApi('test@example.com', 'Password1!');
    expect(result).toEqual(mockUser);
  });

  it('should return error if API client fails', async () => {
    (apiClient.getProfile as jest.Mock).mockResolvedValue({
      data: undefined,
      error: 'Network error',
    });

    const result = await getUserFromApi('test@example.com', 'Password1!');
    expect(result).toEqual({ error: 'Email or password is invalid' });
  });

  it('should return error if no data received', async () => {
    (apiClient.getProfile as jest.Mock).mockResolvedValue({
      data: undefined,
      error: undefined,
    });

    const result = await getUserFromApi('test@example.com', 'Password1!');
    expect(result).toEqual({ error: 'Email or password is invalid' });
  });

  it('should return error if user not found', async () => {
    (apiClient.getProfile as jest.Mock).mockResolvedValue({
      data: [],
      error: undefined,
    });

    const result = await getUserFromApi('test@example.com', 'Password1!');
    expect(result).toEqual({ error: 'Email or password is invalid' });
  });

  it('should return error if password does not match', async () => {
    (apiClient.getProfile as jest.Mock).mockResolvedValue({
      data: [{ ...mockUser, password: 'WrongPassword' }],
      error: undefined,
    });

    const result = await getUserFromApi('test@example.com', 'Password1!');
    expect(result).toEqual({ error: 'Email or password is invalid' });
  });
});

describe('fetchProfile', () => {
  const mockUser = {
    id: '1',
    email: 'test@example.com',
    name: 'Test User',
  };

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return user if found', async () => {
    (apiClient.getProfile as jest.Mock).mockResolvedValue({
      data: [mockUser],
      error: undefined,
    });

    const result = await fetchProfile('test@example.com');
    expect(result).toEqual({ user: mockUser, error: null });
  });

  it('should return error if no email provided', async () => {
    const result = await fetchProfile('');
    expect(result).toEqual({ user: null, error: 'No email provided' });
  });

  it('should return error if API client fails', async () => {
    (apiClient.getProfile as jest.Mock).mockResolvedValue({
      data: undefined,
      error: 'Network error',
    });

    const result = await fetchProfile('test@example.com');
    expect(result).toEqual({ user: null, error: 'Network error' });
  });

  it('should return error if no data received', async () => {
    (apiClient.getProfile as jest.Mock).mockResolvedValue({
      data: undefined,
      error: undefined,
    });

    const result = await fetchProfile('test@example.com');
    expect(result).toEqual({ user: null, error: 'User not found' });
  });

  it('should return error if user not found', async () => {
    (apiClient.getProfile as jest.Mock).mockResolvedValue({
      data: [],
      error: undefined,
    });

    const result = await fetchProfile('test@example.com');
    expect(result).toEqual({ user: null, error: 'User not found' });
  });
});
