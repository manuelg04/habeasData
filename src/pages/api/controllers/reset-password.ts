/* eslint-disable no-console */
// pages/api/reset-password.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import db from '../../../db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { token, newPassword } = req.body;

  try {
    // Verificar y descifrar el token
    const decoded = jwt.verify(token, 'secret'); // Utiliza una clave secreta diferente para los tokens de recuperación

    if (!decoded || typeof decoded !== 'object' || !('email' in decoded)) {
      return res.status(401).json({ message: 'Token inválido' });
    }

    const { email } = decoded;

    // Buscar el usuario por correo electrónico
    const [results] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);

    if (!Array.isArray(results) || results.length === 0) {
      return res.status(401).json({ message: 'Token o usuario inválido' });
    }

    // Hashear la nueva contraseña
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Actualizar la contraseña
    await db.query('UPDATE usuarios SET pass = ? WHERE email = ?', [hashedPassword, email]);

    return res.status(200).json({ message: 'Contraseña actualizada con éxito' });
  } catch (error) {
    console.error('Error al restablecer la contraseña:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
}
