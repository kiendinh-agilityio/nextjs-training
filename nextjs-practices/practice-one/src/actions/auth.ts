'use server';

// import actions auth
import { signIn, signOut } from '@/lib/auth';

// import constants
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
    return { error: ERROR_MESSAGES.ACCOUNT_AND_PASSWORD_INVALID };
  }
  return { error: undefined };
};

export { userLogin, userLogOut };
