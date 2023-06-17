/* eslint-disable no-shadow */
/* eslint-disable no-return-await */
/* eslint-disable promise/catch-or-return */
/* eslint-disable promise/always-return */
/* eslint-disable import/prefer-default-export */
import { initializeApp } from 'firebase/app';
import {
  getStorage, ref, uploadBytes, getDownloadURL,
} from 'firebase/storage';
import { v4 } from 'uuid';
import {
  getFirestore, doc, getDoc, collection, addDoc, getDocs, query, where,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBZpSX3frkc1rRejJ-j8EvxdIIv--28wxE',
  authDomain: 'excelmtm-c7061.firebaseapp.com',
  projectId: 'excelmtm-c7061',
  storageBucket: 'excelmtm-c7061.appspot.com',
  messagingSenderId: '144598036040',
  appId: '1:144598036040:web:94515ce78fa6914ebf727d',
  measurementId: 'G-QC3YKMZX29',
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);

export async function uploadFile(file) {
  const storageRef = ref(storage, v4());
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url;
}

export async function getDocument(collection, id) {
  const docRef = doc(db, collection, id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  }
  throw new Error('No such document!');
}

export async function addDocument(collectionName, data) {
  await addDoc(collection(db, collectionName), data);
}

export async function getDocuments(collectionName) {
  const querySnapshot = await getDocs(collection(db, collectionName));
  const documents = querySnapshot.docs.map((doc) => doc.data());
  return documents;
}

export async function getDocumentsByField(collectionName, fieldName, value) {
  const q = query(collection(db, collectionName), where(fieldName, '==', value));
  const querySnapshot = await getDocs(q);
  const documents = querySnapshot.docs.map((doc) => doc.data());
  return documents;
}
