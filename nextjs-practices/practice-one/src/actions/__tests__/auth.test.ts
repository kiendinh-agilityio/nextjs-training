import { userLogin, userLogOut } from '../auth';
import { signIn, signOut } from '@/lib/auth';
import { ERROR_MESSAGES } from '@/constants/message';

jest.mock('@/lib/auth', () => ({
  signIn: jest.fn(),
  signOut: jest.fn(),
}));

describe('auth actions', () => {
  const email = 'test@example.com';
  const password = 'password123';

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('userLogOut', () => {
    it('should call signOut with redirect: false', async () => {
      await userLogOut();
      expect(signOut).toHaveBeenCalledWith({ redirect: false });
    });
  });

  describe('userLogin', () => {
    it('should call signIn with correct params and return null on success', async () => {
      (signIn as jest.Mock).mockResolvedValueOnce(undefined);
      const result = await userLogin({ email, password });
      expect(signIn).toHaveBeenCalledWith('credentials', {
        email,
        password,
        redirect: false,
      });
      expect(result).toBeNull();
    });

    it('should return error message if signIn throws with type CredentialsSignin', async () => {
      const error = { type: 'CredentialsSignin' };
      (signIn as jest.Mock).mockImplementationOnce(() => {
        throw error;
      });
      const result = await userLogin({ email, password });
      expect(result).toBe(ERROR_MESSAGES.ACCOUNT_AND_PASSWORD_INVALID);
    });

    it('should return error message if signIn throws with message CredentialsSignin', async () => {
      const error = { message: 'CredentialsSignin' };
      (signIn as jest.Mock).mockImplementationOnce(() => {
        throw error;
      });
      const result = await userLogin({ email, password });
      expect(result).toBe(ERROR_MESSAGES.ACCOUNT_AND_PASSWORD_INVALID);
    });

    it('should return error message if signIn throws unknown error', async () => {
      const error = { message: 'Some other error' };
      (signIn as jest.Mock).mockImplementationOnce(() => {
        throw error;
      });
      const result = await userLogin({ email, password });
      expect(result).toBe(ERROR_MESSAGES.ACCOUNT_AND_PASSWORD_INVALID);
    });
  });
});
