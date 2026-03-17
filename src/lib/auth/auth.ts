import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authService } from '../api/auth/auth.service';

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      async authorize(credentials) {
        const { user, accessToken } = await authService.login(credentials);
        return { ...user, accessToken };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.profileImageUrl = user.profileImageUrl;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.birthDate = user.birthDate;
        token.accessToken = user.accessToken;
        token.roleType = user.roleType;
        token.position = user.position;
        token.level = user.level;
        token.gender = user.gender;
        token.status = user.status;
        token.profileImagePublicId = user.profileImagePublicId;
      }
      return token;
    },
    session({ session, token }) {
      session.user.profileImageUrl = token.profileImageUrl;
      session.user.firstName = token.firstName;
      session.user.lastName = token.lastName;
      session.user.birthDate = token.birthDate;
      session.user.accessToken = token.accessToken;
      session.user.roleType = token.roleType;
      session.user.position = token.position;
      session.user.level = token.level;
      session.user.gender = token.gender;
      session.user.status = token.status;
      session.user.profileImagePublicId = token.profileImagePublicId;
      session.user.id = token.sub;

      return session;
    },
  },
});
