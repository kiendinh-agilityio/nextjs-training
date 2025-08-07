import { ZodError } from 'zod';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { loginSchema } from '@/lib/schema';
import { getUserFromApi } from '@/lib/get-user-from-api';
import { ROUTERS } from '@/constants/router';
import { User } from '@/types/user';

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
          const { email, password } = await loginSchema.parseAsync(credentials);

          const result = await getUserFromApi(email, password);

          if (result && 'error' in result) {
            return null;
          }

          return result as User;
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
      if (session && session.user) {
        // Only persist necessary user info
        const { id = '', email = '', name = '' } = token as Partial<User>;
        session.user = { id, email, name, emailVerified: null };
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60,
  },
});
