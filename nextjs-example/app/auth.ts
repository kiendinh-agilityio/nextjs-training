import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";

const getUser = async (email: string) => {
  try {
    const response = await fetch(
      "https://683ff7ba5b39a8039a564c58.mockapi.io/login"
    );
    const users = await response.json();
    return users.find((user: any) => user.email === email);
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
};

export const { auth, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET || "your-super-secret-key-here",
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
      }
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      const isOnLogin = nextUrl.pathname === "/login";

      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false;
      } else if (isLoggedIn && isOnLogin) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }
      return true;
    },
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        console.log("Attempting to authorize:", credentials);
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success) {
          console.log("Invalid credentials parsed:", parsedCredentials.error);
          return null;
        }

        const { email, password } = parsedCredentials.data;
        console.log("Email and password from form:", { email, password });

        const user = await getUser(email);
        console.log("User fetched from mock API:", user);

        if (!user) {
          console.log("User not found for email:", email);
          return null;
        }

        // Compare passwords
        if (password === user.password) {
          console.log("Passwords match. User authorized.");
          return {
            id: user.id,
            email: user.email,
            name: user.email.split("@")[0],
          };
        }

        console.log("Passwords do not match.");
        return null;
      },
    }),
  ],
});
