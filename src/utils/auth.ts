import { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { Routes } from './routes';
import { UserCredential, signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseAuth } from './firebase';
import { getToken } from 'next-auth/jwt';
import { firebaseAdminAuth } from './firebaseAdmin';

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        username: { label: 'username', type: 'text' },
        password: { label: 'password', type: 'password' }
      },
      async authorize(credentials, req) {
        const userCredential = await signInWithEmailAndPassword(
          firebaseAuth,
          credentials?.username as string,
          credentials?.password as string
        );

        return {
          id: userCredential.user?.uid as string,
          name: userCredential.user?.displayName as string,
          email: userCredential.user?.email as string,
          image: userCredential.user?.photoURL as string
        };
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: Routes.login,
    signOut: Routes.logout
  },
  callbacks: {
    async jwt({ token, user, account, profile, trigger, session }) {
      console.log(
        'authOptions callbacks jwt',
        { token, user, account, profile, trigger, session },
        !firebaseAuth.currentUser
      );
      let jwt: string;
      if (!token?.firebaseToken && firebaseAuth.currentUser) {
        console.log('firebaseToken does not exist, creating one');
        jwt = await firebaseAuth.currentUser.getIdToken(true);
      }
      if (token?.firebaseToken) {
        console.log('firebaseToken does exist validate it');
        try {
          await firebaseAdminAuth.verifyIdToken(token?.firebaseToken as string);
          console.log('firebaseToken does exist valid');
        } catch (error) {
          console.log('firebaseToken not valid', error);

          if (firebaseAuth.currentUser) {
            jwt = await firebaseAuth.currentUser.getIdToken(true);
          } else {
            throw new Error('Invalid Firebase Token');
          }
        }
      }

      if (jwt) token.firebaseToken = jwt;

      return token;
    },
    async session({ session, token, user }) {
      // console.log('authOptions callbacks session', { session, token, user });

      // @ts-ignore
      session.firebaseToken = token.firebaseToken;
      return session;
    },
    async signIn({ user, account, profile, email, credentials }) {
      // console.log('authOptions callbacks signIn', { user, account, profile, email, credentials });
      return !!user;
    },
    redirect({ url, baseUrl }) {
      // console.log('authOptions callbacks redirect', { url, baseUrl });
      return Routes.home;
    }
  }
};
