import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

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

export const auth = firebase.auth();
export const googleOAuthProvider = new firebase.auth.GoogleAuthProvider();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
