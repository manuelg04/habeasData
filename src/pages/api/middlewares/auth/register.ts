/* eslint-disable camelcase */
import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import db from '../../../../db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    tipo_doc, usuario, pass, nombre, email, fecha_expedicioncc,
  } = req.body;
  console.log("🚀 ~ req.body:", req.body)
  try {
    // Verifica si el usuario ya existe
    const [existingUsers] = await db.query('SELECT * FROM usuarios WHERE usuario = ?', [usuario]);

    if (Array.isArray(existingUsers) && existingUsers.length > 0) {
      // Si el usuario ya existe, devuelve un error
      return res.status(400).json({ message: 'Usuario ya existe' });
    }
    // Si el usuario no existe, crea uno nuevo
    // Primero, cifra la contraseña
    const hashedPassword = await bcrypt.hash(pass, 10);

    // Ahora inserta el usuario con la contraseña cifrada en la base de datos
    await db.query('INSERT INTO usuarios (tipo_doc, usuario, pass, nombre, email, fecha_expedicioncc, role) VALUES (?, ?, ?, ?, ?, ?, ?)', [tipo_doc, usuario, hashedPassword, nombre, email, fecha_expedicioncc, 'normaluser']);

    return res.status(201).json({ message: 'Usuario creado exitosamente' });
  } catch (error) {
    console.log("🚀 ~ error:", error)
    // Manejo de errores
    return res.status(500).json({ message: 'Error del servidor' });
  }
}
