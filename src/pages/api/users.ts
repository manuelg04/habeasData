import type { NextApiRequest, NextApiResponse } from 'next';
import fetchUsersData from './querysMySQL';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const users = await fetchUsersData();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error al recuperar los datos del usuario.' });
  }
}
