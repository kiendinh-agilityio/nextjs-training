import { ERROR_MESSAGES } from '@/constants/message';

export const authValidations = (error: string) => {
  if (error === 'CredentialsSignin') {
    return ERROR_MESSAGES.ACCOUNT_AND_PASSWORD_INVALID;
  }

  return error;
};
