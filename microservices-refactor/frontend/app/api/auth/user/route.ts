import { NextResponse } from 'next/server';
import axios from 'axios';
import ROUTES_API from '@/constants/api.urls';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req: Request) {
  try {
    const cookieHeader = req.headers.get('cookie') || '';
    const response = await axios.get(ROUTES_API.AUTH.GET_USER, {
      withCredentials: true,
      headers: {
        Cookie: cookieHeader
      }
    });

    if (response.status === 200) {
      return NextResponse.json({ name: response.data.name }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'User not authenticated' }, { status: 401 });
    }
  } catch {
    return NextResponse.json({ message: 'Not authenticated' }, { status: 500 });
  }
}