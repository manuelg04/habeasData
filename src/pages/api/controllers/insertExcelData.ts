/* eslint-disable no-await-in-loop */
/* eslint-disable max-len */
/* eslint-disable no-restricted-syntax */
import { NextApiRequest, NextApiResponse } from 'next';
import xlsx from 'xlsx';
import db from '../../../db'; // Tu conexión a la base de datos

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    // Primero, leemos el archivo Excel
    const workbook = xlsx.readFile('C:/Users/Manull/Downloads/test.xlsx');
    const worksheet = workbook.Sheets[workbook.SheetNames[0]]; // Asume que tus datos están en la primera hoja
    const jsonData = xlsx.utils.sheet_to_json(worksheet, { defval: '' });

    // Luego, iteramos sobre los datos y los insertamos en la base de datos
    for (const row of jsonData) {
      const {
        MFTO, PLACA, PROPIETARIO, DOCUMENTO, FLETE_PAGADO, ANTICIPOS, RETENCIONES_ICA, POLIZA_ESTAMPILLA, FALTANTE_DANO, VR_SALDO_CANCELAR, FECHA_CONSIGNACION_SALDO, urlpago, urlliqui,
      } = row;

      // Preparamos la consulta SQL
      const sql = `
        INSERT INTO libfletes (
          MFTO, 
          PLACA, 
          PROPIETARIO, 
          DOCUMENTO, 
          FLETE_PAGADO, 
          ANTICIPOS, 
          RETENCIONES_ICA, 
          POLIZA_ESTAMPILLA, 
          FALTANTE_DANO, 
          VR_SALDO_CANCELAR, 
          FECHA_CONSIGNACION_SALDO, 
          urlpago, 
          urlliqui
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const values = [
        MFTO,
        PLACA,
        PROPIETARIO,
        DOCUMENTO,
        FLETE_PAGADO,
        ANTICIPOS,
        RETENCIONES_ICA,
        POLIZA_ESTAMPILLA,
        FALTANTE_DANO,
        VR_SALDO_CANCELAR,
        FECHA_CONSIGNACION_SALDO,
        urlpago,
        urlliqui,
      ];

      // Ejecutamos la consulta
      await db.query(sql, values);
    }

    res.status(200).json({ message: 'Data inserted successfully' });
  } catch (error) {
    console.error(`Error inserting data: ${error}`);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
