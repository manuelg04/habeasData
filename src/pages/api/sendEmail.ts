/* eslint-disable no-return-await */
// pages/api/sendEmail.ts
import { render } from '@react-email/render';
import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import PlantillaEmail from '../../emails/plantillaEmail';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const {
      nombre, celular, cedula, correo,
    } = req.body;

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
      to: correo,
      subject: 'Nuevo formulario de habeas data',
      html: render(PlantillaEmail()),
      bcc: 'habeasdata@transportesmtm.com',
    };

    return await transporter.sendMail({
      from: {
        name: 'Habeas Data TRANS MTM',
        address: 'habeasdata@transportesmtm.com',
      },
      ...mailOptions,
    });
  }
}
