import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../db';

export default async function GuardarUsuarios(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const {
      nombre, cedula, celular, correo, acepto,
    } = req.body;

    try {
      const result = await db.query(
        'INSERT INTO infousuarios (nombres, cedula, celular, email, acepto, fecha) VALUES ($1, $2, $3, $4, $5, NOW())',
        [nombre, cedula, celular, correo, acepto],
      );
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: 'Hubo un error al insertar los datos en la base de datos.' });
    }
  } else {
    res.status(405).json({ error: 'Método no permitido.' });
  }
}
