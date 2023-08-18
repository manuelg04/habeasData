import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // 1. Loguear todas las cookies para verificar que las estamos recibiendo correctamente.

  const { token } = req.cookies;

  if (!token) {
    // Esto nos dirá si no encontramos el token en las cookies.
    return res.status(401).json({ isValid: false });
  }

  try {
    const decoded = jwt.verify(token, 'secret');

    // Loguear el token decodificado para verificar su estructura y contenido.

    return res.status(200).json({ isValid: true, user: decoded });
  } catch (error) {
    return res.status(401).json({ isValid: false });
  }
}
