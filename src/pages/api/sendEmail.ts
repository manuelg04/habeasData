/* eslint-disable no-return-await */
/* eslint-disable consistent-return */
import { render } from '@react-email/render';
import type { NextApiRequest } from 'next';
import nodemailer from 'nodemailer';
import { pdf } from '@react-pdf/renderer';
import PlantillaEmail from '../../emails/plantillaEmail';
import MyDocument from '../PdfDocumento';

export default async function handler(req: NextApiRequest) {
  if (req.method === 'POST') {
    const {
      correo,
      nombre,
      cedula,
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

    // Generar el archivo PDF
    const pdfDoc = pdf(MyDocument({ cedula, nombre, fecha: new Date().toLocaleString() }));

    const pdfBuffer = await pdfDoc.toBuffer();

    const mailOptions = {
      to: correo,
      subject: 'Nuevo formulario de habeas data',
      html: render(PlantillaEmail()),
      bcc: 'habeasdata@transportesmtm.com',
      attachments: [
        { // Adjuntar el archivo PDF
          filename: 'suhabeasdata.pdf',
          content: pdfBuffer,
        },
      ],
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
