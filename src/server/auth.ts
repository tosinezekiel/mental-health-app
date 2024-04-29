import { PrismaAdapter } from "@auth/prisma-adapter";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import { type Adapter } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";
import { ILoginFormValues } from "~/types/formTypes";
import bcrypt from 'bcryptjs';
import { Prisma } from "@prisma/client";

import { env } from "~/env";
import { db } from "~/server/db";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      password: string;
      role?: "USER" | "ADMIN";
    } & DefaultSession["user"];
  }

  interface User {
    role?: string;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    session: async ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
      },
    }),
    async jwt({ token, user }) {
      if (user) {
        return { ...token, ...user };
      }

      return token;
      
    },
  },
  adapter: PrismaAdapter(db) as Adapter,
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 60 * 60, 
    updateAge: 86400,
  },
  pages: {
    signIn: '/login',
  },
  debug: true,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials: ILoginFormValues | undefined, req) {
        if (!credentials) {
          return null;
        }
        try {
          const user = await db.user.findUnique({
            where: { email: credentials.email },
          });
          if (user && bcrypt.compareSync(credentials.password, user.password)) {
            return { id: user.id, firstName: user.firstName, lastName: user.lastName, role: user.role, email: user.email };
          } else {
            throw new Error('Invalid email or password');
          }
        } catch (error) {
          throw error;
        }
      }
    })
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
