import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../db';

export default async function GuardarUsuarios(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const {
      nombre, cedula, celular, correo, acepto,
    } = req.body;

    try {
      const [result] = await db.execute('INSERT INTO infousuarios (nombres, cedula, celular, email, acepto) VALUES (?, ?, ?, ?, ?)', [nombre, cedula, celular, correo, acepto]);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: 'Hubo un error al insertar los datos en la base de datos.' });
      console.log(error);
    }
  } else {
    res.status(405).json({ error: 'Método no permitido.' });
  }
}
