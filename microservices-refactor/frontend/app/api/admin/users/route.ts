import { NextResponse } from 'next/server';
import axios from 'axios';
import ROUTES_API from '@/constants/api.urls';

export async function GET(req: Request) {
  try {
    const cookieHeader = req.headers.get('cookie') || '';
    const response = await axios.get(ROUTES_API.ADMIN.USERS, {
      withCredentials: true,
      headers: {
        Cookie: cookieHeader
      }
    });

    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
  console.error('Error fetching users:', error);
  return NextResponse.json({ message: 'Error fetching users' }, { status: 500 });
}
}
