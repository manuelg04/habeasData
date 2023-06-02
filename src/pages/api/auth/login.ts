import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import db from '../../../db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { usuario, pass } = req.body;
  console.log(req.body);

  console.log('🚀 ~ pass:', pass);
  try {
    // Consulta el usuario con el correo electrónico proporcionado
    const [results] = await db.query('SELECT * FROM usuarios WHERE usuario = ?', [usuario]);
    console.log('🚀 ~ results:', results);

    if (results.length > 0) {
      const user = results[0];

      if (pass === user.pass) {
        // Codifica la información del usuario en el token JWT
        const token = jwt.sign({ usuario }, 'secret', { expiresIn: '1h' });

        return res.status(200).json({ token });
      }
    }

    return res.status(401).json({ message: 'Invalid credentials' });
  } catch (error) {
    // Handle error
    console.error('An error occurred: ', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
