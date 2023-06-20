// writeDataToFirestore.ts
import { addDocument } from './firebase';

export default async function handler(req, res) {
  const { data } = req.body;

  try {
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
    const promises = cleanedData.map((row) => addDocument('prueba', row));

    await Promise.all(promises);

    res.status(200).json(cleanedData);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
}
