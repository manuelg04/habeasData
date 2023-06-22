/* eslint-disable promise/no-nesting */
/* eslint-disable no-case-declarations */
/* eslint-disable no-console */
/* eslint-disable no-shadow */
/* eslint-disable no-return-await */
/* eslint-disable promise/catch-or-return */
/* eslint-disable promise/always-return */
/* eslint-disable import/prefer-default-export */
import { initializeApp } from 'firebase/app';
import {
  getStorage, ref, uploadBytes, getDownloadURL, getBlob,
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
  const ext = file.name.split('.')[1];
  const storageRef = ref(storage, `${v4()}.${ext}`);
  switch (ext) {
    case 'pdf':
      const prueba = await uploadBytes(storageRef, file);
      console.log('🚀 ~ prueba:', prueba);
      const URL1 = await getDownloadURL(storageRef);
      console.log('🚀 ~ URL:', URL1);
      break;
    case 'xlsx':
      await uploadBytes(storageRef, file);
      const URL2 = await getDownloadURL(storageRef);
      console.log('🚀 ~ URL:', URL2);
      break;

    default:
      break;
  }

  return url;
}

export async function downloadFileByName(fileName) {
  // const pathReference = ref(storage, `${fileName}.pdf`);
  // const gsReference = ref(storage, 'gs://excelmtm-c7061.appspot.com/44025364-d8e3-4e55-9186-193bf5a49a11.pdf');
  try {
    const fileUrl = await getDownloadURL(ref(storage, fileName));
    window.open(fileUrl, '_blank');
  } catch (error) {
    console.log(error);
  }
}
