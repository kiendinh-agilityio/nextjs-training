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
  const res = await signIn('credentials', {
    email,
    password,
    redirect: false,
  });
  if (res?.error) {
    return ERROR_MESSAGES.ACCOUNT_AND_PASSWORD_INVALID;
  }
  return null;
};

export { userLogin, userLogOut };
