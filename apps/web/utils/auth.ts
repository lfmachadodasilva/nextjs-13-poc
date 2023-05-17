import { FirebaseAdapter } from '@next-auth/firebase-adapter';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { AuthProviders } from './authProviders';
import { firebaseAuth } from './firebase';
import { Routes } from './routes';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET as string
    }),
    Credentials({
      name: AuthProviders.Credentials,
      credentials: {
        username: { label: 'username', type: 'text' },
        password: { label: 'password', type: 'password' }
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        // console.log('authorize', credentials, req);

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
  adapter: FirebaseAdapter(firebaseAuth),
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: Routes.login,
    signOut: Routes.logout
  },
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    secret: process.env.NEXTAUTH_SECRET
  },
  callbacks: {
    async jwt({ token, user, account, profile, trigger, session }) {
      // console.log('authOptions callbacks jwt', {
      //   token,
      //   user,
      //   account,
      //   profile,
      //   trigger,
      //   session
      // });
      return token;
    },
    async session({ session, token, user }) {
      // console.log('authOptions callbacks session', { session, token, user });
      return { ...session, user: { ...session.user, id: token.sub } };
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
