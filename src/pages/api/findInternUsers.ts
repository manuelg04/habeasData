import type { NextApiRequest, NextApiResponse } from 'next';
import db from '../../db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { usuario } = req.query; // Asume que el nombre se pasa como un parámetro de consulta

  try {
    // Busca al usuario por nombre
    const [users] = await db.query('SELECT * FROM usuarios WHERE usuario = ?', [usuario]);

    if (Array.isArray(users) && users.length > 0) {
      // Si el usuario existe, devuelve los datos del usuario
      return res.status(200).json(users[0]); // Solo devuelve el primer usuario que coincida
    }
    // Si el usuario no existe, devuelve un error
    return res.status(404).json({ message: 'Usuario no encontrado' });
  } catch (error) {
    // Manejo de errores
    return res.status(500).json({ message: 'Error del servidor' });
  }
}
