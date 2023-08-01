/* eslint-disable no-loop-func */
/* eslint-disable prefer-destructuring */
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
  doc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
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

type RowData = {
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
    console.log('Row data:', row);
    // Verifica si ya existe un documento con el mismo MFTO
    const q = query(collectionRef, where('MFTO', '==', row.MFTO));
    const querySnapshot = await getDocs(q);

    // Si no existe, lo inserta
    if (querySnapshot.empty) {
      console.log('Inserting row:', row);
      await addDoc(collectionRef, row);
    } else {
      // Existe un documento, verifica si algún campo ha cambiado
      querySnapshot.forEach((queryDocumentSnapshot) => {
        const existingData = queryDocumentSnapshot.data();
        console.log('Existing data:', existingData);
        const changes = {};
        Object.keys(row).forEach((key) => {
          if (row[key] !== existingData[key]) {
            console.log('Field has changed:', key, 'old:', existingData[key], 'new:', row[key]);
            changes[key] = row[key];
          }
        });
        if (Object.keys(changes).length > 0) {
          console.log('Updating doc with changes:', changes);
          updateDoc(doc(db, 'nombre_de_tu_colección', queryDocumentSnapshot.id), changes);
        }
      });
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

export async function uploadAndAssignFile(file) {
  // Extraer el MFTO y el tipo del nombre del archivo
  const fileName = file.name.split('.').slice(0, -1).join('.'); // Obtén el nombre del archivo sin la extensión
  let MFTO;
  let type;

  if (fileName.includes('_liquidacion')) {
    MFTO = fileName.split('_')[0];
    type = 'liquidacion';
  } else {
    MFTO = fileName;
    type = 'pago';
  }

  // subir el archivo a Firebase Storage
  const url = await uploadNonExcelFile(file);

  // referencia a la colección
  const collectionRef = collection(db, 'nombre_de_tu_colección');

  // Obtén el documento con el MFTO correspondiente
  const q = query(collectionRef, where('MFTO', '==', MFTO));
  const querySnapshot = await getDocs(q);

  // Verifica si el documento existe
  if (querySnapshot.empty) {
    console.log(`No se encontró ningún documento con el MFTO ${MFTO}`);
    return;
  }

  // Si el documento existe, obtén su referencia y actualiza la url
  const docRef = querySnapshot.docs[0].ref;

  if (type === 'pago') {
    await updateDoc(docRef, { urlpago: url });
  } else if (type === 'liquidacion') {
    await updateDoc(docRef, { urlliquidacion: url });
  }
}
