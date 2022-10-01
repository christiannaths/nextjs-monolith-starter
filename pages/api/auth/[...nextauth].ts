import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import shortId from "lib/shortId";

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
  callbacks: {
    async session({ session, user }: any) {
      if (!user) return session;

      const { user: _user, ...rest } = session;

      return { ...rest, ...user };
    },
  },
  events: {
    async createUser({ user }: any) {
      await prisma.author.create({
        data: {
          friendlyId: shortId(),
          name: "Hello world",
          user: { connect: { id: user.id } },
        },
      });
    },
  },
};

export default NextAuth(authOptions);
