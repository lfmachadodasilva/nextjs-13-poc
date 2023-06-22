import * as admin from 'firebase-admin';
import { App } from 'firebase-admin/app';
import * as firestore from 'firebase-admin/firestore';

export const firebaseAdminApp: App =
  admin.apps.length > 0
    ? (admin.apps[0] as App)
    : admin.initializeApp({
        credential: admin.credential.cert({
          project_id: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
          client_email: process.env.FIREBASE_CLIENT_EMAIL,
          private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
          private_key: (process.env.FIREBASE_PRIVATE_KEY as string).replace(/\\n/g, '\n')
        } as any),
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        databaseURL: `https://${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.firebaseio.com`,
        storageBucket: `${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.appspot.com`
      });

export const firebaseAdminFirestore = firestore.getFirestore(firebaseAdminApp);
export const firebaseAdminAuth = admin.auth(firebaseAdminApp);
export const firebaseAdminStorage = admin.storage(firebaseAdminApp);
