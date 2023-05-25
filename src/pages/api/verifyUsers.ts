import { NextApiRequest, NextApiResponse } from 'next';
import { getUserByCedula } from './usersByCedula';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { cedula } = req.query;
    try {
      console.log("Trying to fetch user with cedula:", cedula); // Agregamos un registro de consola aquí
      const usuario = await getUserByCedula(cedula as string);
      console.log("Fetched user:", usuario); // Y aquí
      res.status(200).json(usuario);
    } catch (error) {
      console.error("Caught an error:", error); // Este registro de consola mostrará los detalles del error en la consola del servidor
      res.status(500).json({ message: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ message: `Method ${req.method} is not allowed` });
  }
}
