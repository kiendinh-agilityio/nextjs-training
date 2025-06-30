import { ZodError } from 'zod';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { loginSchema } from '@/lib/schema';
import { getUserFromApi } from '@/lib/get-user-from-api';
import { ROUTERS } from '@/constants/router';

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET,
  providers: [
    Credentials({
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'Enter your email',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Enter your password',
        },
      },
      authorize: async (credentials) => {
        try {
          let user = null;

          const { email, password } = await loginSchema.parseAsync(credentials);

          user = await getUserFromApi(email, password);

          if (!user || (user && user.error)) {
            return null;
          }

          return user;
        } catch (error) {
          if (error instanceof ZodError) {
            return null;
          }
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: ROUTERS.LOGIN,
  },
  callbacks: {
    async session({ session, token }) {
      if (session?.user) Object.assign(token, session.user);
      if (session && session.user) {
        Object.assign(session.user, token);
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60,
  },
});
