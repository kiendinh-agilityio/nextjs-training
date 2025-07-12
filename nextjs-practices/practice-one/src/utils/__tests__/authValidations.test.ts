import { authValidations } from '../authValidations';

jest.mock('@/constants/message', () => ({
  ERROR_MESSAGES: {
    ACCOUNT_AND_PASSWORD_INVALID: 'Account or password is invalid',
  },
}));

describe('authValidations', () => {
  it('should return error message for CredentialsSignin', () => {
    expect(authValidations('CredentialsSignin')).toBe(
      'Account or password is invalid',
    );
  });

  it('should return original error for other cases', () => {
    expect(authValidations('SomeOtherError')).toBe('SomeOtherError');
  });
});
