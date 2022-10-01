import NextAuth from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import shortId from 'lib/shortId';

const prisma = new PrismaClient();

export const authOptions = {
  secret: process.env.SECRET,
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    // signOut: '/auth/signout',
    // error: '/auth/error', // Error code passed in query string as ?error=
    verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  callbacks: {
    async session({ session, user }: any) {
      if (!user) return session;

      const { user: _user, ...rest } = session;

      return { ...rest, ...user };
    },
  },
  events: {
    async createUser({ user }: any) {
      // user created, send email or whaterver
    },
  },
};

export default NextAuth(authOptions);
