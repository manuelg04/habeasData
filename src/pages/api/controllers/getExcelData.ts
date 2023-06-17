/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable max-len */
/* eslint-disable new-cap */
import axios from 'axios';
import { Buffer } from 'buffer';
import XLSX from 'xlsx';
import { addDocument } from './firebase';

export default async function handler(req, res) {
  const { url } = req.query;

  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    const workbook = XLSX.read(Buffer.from(response.data, 'binary'), { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1, raw: false });
    const cleanedData = data.map((row) => {
      const cleanedRow = {
        MFTO: row[0] || '',
        PLACA: row[1] || '',
        PROPIETARIO: row[2] || '',
        DOCUMENTO: row[3] || '',
        'FLETE PAGADO': row[4] || '',
        ANTICIPOS: row[5] || '',
        'RETENCIONES ICA 5*1000 / FUENTE 1%': row[6] || '',
        'POLIZA / ESTAMPILLA': row[7] || '',
        'FALTANTE / O DAÑO EN LA MERCANCIA': row[8] || '',
        'VR. SALDO CANCELAR': row[9] || '',
        'FECHA CONSIGNACION SALDO': row[10] || '',
      };

      Object.keys(cleanedRow).forEach((key) => {
        if (cleanedRow[key] === undefined) {
          delete cleanedRow[key];
        }
      });

      return cleanedRow;
    });
    // Añade cada fila a Firestore
    for (const row of cleanedData) {
      await addDocument('prueba', row);
    }
    res.status(200).json(cleanedData);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
}
