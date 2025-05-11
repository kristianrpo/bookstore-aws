import { NextResponse } from 'next/server';
import axios from 'axios';
import ROUTES_API from '@/constants/api.urls';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req: Request) {
  try {
    const cookieHeader = req.headers.get('cookie') || '';
    const response = await axios.get(ROUTES_API.AUTH.LOGOUT, {
      withCredentials: true,
      headers: {
        Cookie: cookieHeader
      }
    });

    if (response.status === 200) {
      const nextResponse = NextResponse.json(
        { message: 'Logout successful' }, 
        { status: 200 }
      );
      
      const setCookieHeader = response.headers['set-cookie'];
      if (setCookieHeader) {
        if (Array.isArray(setCookieHeader)) {
          setCookieHeader.forEach(cookie => {
            nextResponse.headers.append('Set-Cookie', cookie);
          });
        } else {
          nextResponse.headers.set('Set-Cookie', setCookieHeader);
        }
      }
      
      return nextResponse;
    } else {
      return NextResponse.json({ message: 'Logout failed' }, { status: 400 });
    }
  } catch {
    return NextResponse.json({ message: 'Logout failed' }, { status: 500 });
  }
}