import { verify } from 'jsonwebtoken';
import { serialize } from 'cookie';

export default function logout(req, res) {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  const serialized = serialize('token', null, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: -1,
    path: '/',
  });
  res.setHeader('Set-Cookie', serialized);
  res.status(200).json({ message: 'Logout successful' });
}
