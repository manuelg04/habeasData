/* eslint-disable consistent-return */
/* eslint-disable no-console */
// pages/api/recoveryPassword.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import db from '../../../db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email } = req.body;

  try {
    // Consulta el usuario con el correo electrónico proporcionado
    const [results] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);

    if (Array.isArray(results) && results.length > 0) {
      const user = results[0] as {id: number, email: string};

      // Genera un token de recuperación de contraseña
      const recoveryToken = jwt.sign(
        { email: user.email, id: user.id },
        'secret',
        { expiresIn: '1h' },
      );

      // Simula el envío del token por correo electrónico.
      // Aquí deberías implementar el envío de correos reales.
      const transporter = nodemailer.createTransport({
        host: 'smtp.hostinger.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: 'habeasdata@transportesmtm.com',
          pass: 'Hdmtm2023+',
        },
      });

      const mailOptions = {
        from: 'habeasdata@transportesmtm.com', // sender address
        to: user.email,
        subject: 'Nuevo formulario de habeas data',
        text: `Haz clic en este enlace para restablecer tu contraseña: https://transportesmtm.co/recuperar-clave?token=${recoveryToken}`,
      };

      return await transporter.sendMail({
        from: {
          name: 'Habeas Data TRANSPORTES MTM',
          address: 'habeasdata@transportesmtm.com',

        },
        ...mailOptions,
      });
    }
    return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error interno del servidor', error });
  }
}
