/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-useless-escape */
/* eslint-disable quote-props */
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
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { utils, read } from 'xlsx';
import _, { map, toArray } from 'lodash';
import { COLECCION_MAIN } from '../../../constantes';

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

export async function processExcel(file) {
  const response = await fetch(file);
  const arrayBuffer = await response.arrayBuffer();
  const data = new Uint8Array(arrayBuffer);
  const workbook = read(data, { type: 'array' });
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];

  const sheetDataArray = utils.sheet_to_json(worksheet, { header: 1 });
  const headers = toArray(sheetDataArray[0]);
  const TITULOS_CORRECTOS = [
    'FECHA DESPACHO', // FECHA DESPACH LA POSICION 0 ESTA MAL ESCRITO,
    'MFTO',
    'PLACA',
    'PROPIETARIO',
    'DOCUMENTO',
    'FLETE PAGADO',
    'ANTICIPOS',
    'RETENCIONES ICA 5*1000 / FUENTE 1%',
    'POLIZA / ESTAMPILLA',
    'FALTANTE / O DAÑO EN LA MERCANCIA',
    'VR. SALDO CANCELAR',
    'FECHA CONSIGNACION SALDO',
  ];
  const posicionesMALAS = [];
  const comparedArrays = () => {
    map(headers, (header, index) => {
      const correctTitle = TITULOS_CORRECTOS[index];
      const isIncorrect = header !== correctTitle;
      if (isIncorrect) {
        // console.log(`El título ${header} en la posición ${index} es incorrecto. Debería ser ${correctTitle}`);
        posicionesMALAS.push(index);
      }
    });
    return posicionesMALAS;
  };

  const correcionDeTitulos = () => {
    const titulosCorregidos = [];
    map(posicionesMALAS, (posicion) => {
      titulosCorregidos.push(TITULOS_CORRECTOS[posicion]);
    });
    return titulosCorregidos;
  };
  // CREAR FUNCION PARA CORREGIR LOS TITULOS y guardar las posiciones mal en un array

  const jsonData = utils.sheet_to_json(worksheet, { raw: false });

  const checkIfExists = async (manifiesto) => {
    const q = query(collection(db, COLECCION_MAIN), where('MFTO', '==', manifiesto));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  };

  jsonData.forEach(async (obj:any, index) => {
    const existe = await checkIfExists(obj.MFTO);
    if (existe) {
      console.error('El MFTO ya existe en la base de datos');
    } else {
      const hayTitulosMalos = comparedArrays();
      if (hayTitulosMalos.length > 0) {
        const titulosCorregidos = correcionDeTitulos();
      } else {
        await addDoc(collection(db, COLECCION_MAIN), obj);
      }
    }
  });
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
  const collectionRef = collection(db, COLECCION_MAIN);

  // Obtén el documento con el MFTO correspondiente
  const q = query(collectionRef, where('MFTO', '==', MFTO));
  const querySnapshot = await getDocs(q);

  // Verifica si el documento existe
  if (querySnapshot.empty) {
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
