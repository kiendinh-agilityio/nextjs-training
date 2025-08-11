import { userLogin, userLogOut } from '../auth';

// import actions auth
import { signIn, signOut } from '@/lib/auth';

// import constants
import { ERROR_MESSAGES } from '@/constants/message';
import { AUTH_DATA } from '@/mocks/auth';

jest.mock('@/lib/auth', () => ({
  signIn: jest.fn(),
  signOut: jest.fn(),
}));

describe('auth actions', () => {
  const { EMAIL: email, PASSWORD: password } = AUTH_DATA;

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
    it('should return error message if signIn returns error in response', async () => {
      (signIn as jest.Mock).mockResolvedValueOnce({
        error: 'CredentialsSignin',
      });
      const result = await userLogin({ email, password });
      expect(result).toEqual({
        error: ERROR_MESSAGES.ACCOUNT_AND_PASSWORD_INVALID,
      });
    });

    it('should return null if signIn succeeds', async () => {
      (signIn as jest.Mock).mockResolvedValueOnce(undefined);
      const result = await userLogin({ email, password });
      expect(result).toEqual({ error: undefined });
    });
  });
});
