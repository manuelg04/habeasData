/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable max-len */
/* eslint-disable no-console */
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
  addDoc,
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from 'firebase/firestore';
import { utils, read } from 'xlsx';

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

interface RowData {
  MFTO: string;
  PLACA: string;
  PROPIETARIO: string;
}


export async function processExcel(file) {
  const response = await fetch(file);
  const arrayBuffer = await response.arrayBuffer();
  const data = new Uint8Array(arrayBuffer);
  const workbook = read(data, { type: 'array' });
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];

  const jsonData = utils.sheet_to_json(worksheet, { raw: false });

  const collectionRef = collection(db, 'nombre_de_tu_colección');

  // Recorre cada fila del archivo Excel
  for (const row of jsonData as RowData[]) {
    // Verifica si ya existe un documento con el mismo MFTO
    const q = query(collectionRef, where('MFTO', '==', row.MFTO));
    const querySnapshot = await getDocs(q);

    // Si no existe, lo inserta
    if (querySnapshot.empty) {
      await addDoc(collectionRef, row);
    } else {
      console.log(`Ya existe un documento con MFTO: ${row.MFTO}. Se omite la inserción.`);
    }
  }
}

export async function uploadFile(file) {
  const storageRef = ref(storage, v4());
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);

  // Después de subir el archivo, lo procesamos
  await processExcel(url);

  return url;
}

export async function uploadNonExcelFile(file) {
  const storageRef = ref(storage, v4());
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url;
}
