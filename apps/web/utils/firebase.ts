import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

const firebaseKey = process.env.NEXT_PUBLIC_FIREBASE_KEY as string;
const firebaseProjectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID as string;

export const firebaseApp = initializeApp({
  apiKey: firebaseKey,
  authDomain: `${firebaseProjectId}.firebaseapp.com`,
  databaseURL: `https://${firebaseProjectId}.firebaseio.com`,
  projectId: firebaseProjectId,
  storageBucket: `${firebaseProjectId}.appspot.com`
});

export const firebaseAuth = getAuth(firebaseApp);
export const firebaseDatabase = getDatabase(firebaseApp);
export const firebaseStorage = getStorage(firebaseApp);
