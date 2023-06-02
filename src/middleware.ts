/* eslint-disable import/prefer-default-export */
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(req: NextRequest) {
  console.log('middelware');
  const token = req.cookies.get('token');
  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
  console.log(token);
}
export const config = {
  matcher: ['/dashboard/:path*'],
};
