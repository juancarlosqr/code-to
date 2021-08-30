import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import { TSFixMe } from './types';

const firebaseConfig = {
  apiKey: 'AIzaSyASrAX5kGwlQjIRHyvK26DGiEZ7z1AJDE8',
  authDomain: 'code-nextjs.firebaseapp.com',
  projectId: 'code-nextjs',
  storageBucket: 'code-nextjs.appspot.com',
  messagingSenderId: '1086102071813',
  appId: '1:1086102071813:web:4d69297515f7a4c2c1ca6c',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export type Timestamp = firebase.firestore.Timestamp;
export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();

export const fromMillis = firebase.firestore.Timestamp.fromMillis;
export const ts = firebase.firestore.FieldValue.serverTimestamp;
export const googleOAuthProvider = new firebase.auth.GoogleAuthProvider();

/**
 * Gets a users/{uid} document with username
 * @param  {string} username
 */
export async function getUserWithUsername(username: string) {
  const usersRef = db.collection('users');
  const query = usersRef.where('username', '==', username).limit(1);
  const userDoc = (await query.get()).docs[0];

  return userDoc;
}

/**
 * Converts a firestore document to JSON
 * @param  {DocumentSnapshot} doc
 */
export function postToJSON(doc: TSFixMe) {
  const data = doc.data();

  return {
    ...data,
    // Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
    createdAt: data.createdAt.toMillis(),
    updatedAt: data.updatedAt.toMillis(),
  };
}
