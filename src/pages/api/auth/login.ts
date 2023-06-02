import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = req.body;

  // Aquí estamos simulando la autenticación del usuario verificando las credenciales estáticas
  if (email === 'superadmin@admin.com' && password === 'mtm123') {
    // Estamos codificando la información del usuario en el token JWT
    const token = jwt.sign({ email }, 'secret', { expiresIn: '1h' });

    return res.status(200).json({ token });
  }
  return res.status(401).json({ message: 'Invalid credentials' });
}
