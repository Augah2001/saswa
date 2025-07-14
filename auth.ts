import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        if (credentials.email && credentials.password) {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email as string },
          });

          if (!user) return null;

          const passwordsMatch = await bcrypt.compare(
            credentials.password as string,
            user.password
          );

          if (passwordsMatch) return user;
        }

        return null;
      },
    }),
  ],
});
