/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable prefer-destructuring */
/* eslint-disable max-len */
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid'; // Importa el generador de UUID
import { getStorage, ref, uploadBytes } from 'firebase/storage'; // Importa los módulos de Firebase Storage
import { initializeApp, FirebaseOptions } from 'firebase/app';

const firebaseConfig: FirebaseOptions = {
  apiKey: 'AIzaSyBZpSX3frkc1rRejJ-j8EvxdIIv--28wxE',
  authDomain: 'excelmtm-c7061.firebaseapp.com',
  projectId: 'excelmtm-c7061',
  storageBucket: 'excelmtm-c7061.appspot.com',
  messagingSenderId: '144598036040',
  appId: '1:144598036040:web:94515ce78fa6914ebf727d',
  measurementId: 'G-QC3YKMZX29',
};

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);
const upload = multer({ dest: 'C:\\Users\\Manull\\Downloads' }); // Ruta correcta aquí

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function uploadHandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    upload.any('file')(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      const file = req.body.files; // Cambio en la obtención del archivo

      if (!file) {
        return res.status(400).json({ error: 'No se encontró ningún archivo' });
      }

      if (!fs.existsSync(file.path)) {
        return res.status(400).json({ error: 'El archivo no existe' });
      }

      const stream = fs.readFileSync(file.path);
      const fileName = `uploads/${uuidv4()}-${file.originalname}`;

      // Sube el archivo al almacenamiento de Firebase
      // Sube el archivo al almacenamiento de Firebase
      await uploadBytes(ref(storage, fileName), stream);

      fs.unlinkSync(file.path); // Elimina el archivo de la carpeta temporal después de subirlo a Firebase Storage

      return res.status(200).json({ success: true, message: 'Archivo subido con éxito' });
    });
  } catch (error) {
    return res.status(500).json({ error: `Error al subir archivo: ${error.message}` });
  }
}
