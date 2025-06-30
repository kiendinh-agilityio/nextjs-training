'use server';

import { signIn, signOut } from '@/lib/auth';
import { ERROR_MESSAGES } from '@/constants/message';

const userLogOut = async () => {
  await signOut({
    redirect: false,
  });
};

const userLogin = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    return null;
  } catch (error: unknown) {
    if (
      typeof error === 'object' &&
      error !== null &&
      ('type' in error || 'message' in error) &&
      ((error as { type?: string }).type === 'CredentialsSignin' ||
        (error as { message?: string }).message === 'CredentialsSignin')
    ) {
      return ERROR_MESSAGES.ACCOUNT_AND_PASSWORD_INVALID;
    }

    return ERROR_MESSAGES.ACCOUNT_AND_PASSWORD_INVALID;
  }
};

export { userLogin, userLogOut };
