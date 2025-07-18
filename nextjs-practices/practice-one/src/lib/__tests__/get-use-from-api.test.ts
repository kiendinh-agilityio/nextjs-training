import { getUserFromApi } from '../get-user-from-api';

// Mock global fetch
const globalAny: typeof globalThis = global;

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

  it('should return error if fetch throws', async () => {
    globalAny.fetch = jest.fn().mockRejectedValue(new Error('Network error'));
    const result = await getUserFromApi('test@example.com', 'Password1!');
    expect(result).toEqual({ error: 'Email or password is invalid' });
  });

  it('should return error if response is not ok', async () => {
    globalAny.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: async () => [],
    });
    const result = await getUserFromApi('test@example.com', 'Password1!');
    expect(result).toEqual({ error: 'Email or password is invalid' });
  });

  it('should return error if data is not array or empty', async () => {
    globalAny.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => [],
    });
    const result = await getUserFromApi('test@example.com', 'Password1!');
    expect(result).toEqual({ error: 'Email or password is invalid' });

    globalAny.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => null,
    });
    const result2 = await getUserFromApi('test@example.com', 'Password1!');
    expect(result2).toEqual({ error: 'Email or password is invalid' });
  });

  it('should return error if password does not match', async () => {
    globalAny.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => [{ ...mockUser, password: 'WrongPassword' }],
    });
    const result = await getUserFromApi('test@example.com', 'Password1!');
    expect(result).toEqual({ error: 'Email or password is invalid' });
  });

  it('should return user if email and password match', async () => {
    globalAny.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => [mockUser],
    });
    const result = await getUserFromApi('test@example.com', 'Password1!');
    // Check all keys in mockUser
    Object.keys(mockUser).forEach((key) => {
      expect(result).toHaveProperty(
        key,
        mockUser[key as keyof typeof mockUser],
      );
    });
  });
});

describe('fetchProfile', () => {
  const globalAny: typeof globalThis = global;
  const mockUser = {
    id: '1',
    email: 'test@example.com',
    password: 'Password1!',
    name: 'Test User',
  };

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return error if no email provided', async () => {
    const { fetchProfile } = await import('../get-user-from-api');
    const result = await fetchProfile('');
    expect(result).toEqual({ user: null, error: 'No email provided' });
  });

  it('should return error if fetch throws', async () => {
    const { fetchProfile } = await import('../get-user-from-api');
    globalAny.fetch = jest.fn().mockRejectedValue(new Error('Network error'));
    const result = await fetchProfile('test@example.com');
    expect(result).toEqual({ user: null, error: 'Network error' });
  });

  it('should return error if response is not ok', async () => {
    const { fetchProfile } = await import('../get-user-from-api');
    globalAny.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 401,
      statusText: 'Unauthorized',
      json: async () => [],
    });
    const result = await fetchProfile('test@example.com');
    expect(result).toEqual({
      user: null,
      error: 'Failed to fetch profile: 401 Unauthorized',
    });
  });

  it('should return error if data is not array or empty', async () => {
    const { fetchProfile } = await import('../get-user-from-api');
    globalAny.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => [],
    });
    const result = await fetchProfile('test@example.com');
    expect(result).toEqual({ user: null, error: 'User not found' });

    globalAny.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => null,
    });
    const result2 = await fetchProfile('test@example.com');
    expect(result2).toEqual({ user: null, error: 'User not found' });
  });

  it('should return user if data is valid', async () => {
    const { fetchProfile } = await import('../get-user-from-api');
    globalAny.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => [mockUser],
    });
    const result = await fetchProfile('test@example.com');
    expect(result).toEqual({ user: mockUser, error: null });
  });

  it('should return error message from unknown error', async () => {
    const { fetchProfile } = await import('../get-user-from-api');
    globalAny.fetch = jest.fn().mockRejectedValue('some error');
    const result = await fetchProfile('test@example.com');
    expect(result).toEqual({ user: null, error: 'User not found' });
  });
});
