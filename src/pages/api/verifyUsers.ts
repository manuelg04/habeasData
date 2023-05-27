import { NextApiRequest, NextApiResponse } from 'next';
import { getUserByCedula } from './usersByCedula';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { cedula } = req.query;
    try {
      const usuario = await getUserByCedula(cedula as string);
      res.status(200).json(usuario);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ message: `Method ${req.method} is not allowed` });
  }
}
