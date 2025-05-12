import { NextResponse } from 'next/server';
import axios from 'axios';
import ROUTES_API from '@/constants/api.urls';
import { cookies } from 'next/headers';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ bookId: string }> }
) {
  try {
    const { bookId } = await params;
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session');

    if (!sessionCookie) {
      return NextResponse.json(
        { message: 'Unauthorized: Session cookie not found' },
        { status: 401 }
      );
    }

    const { quantity, price } = await request.json();
    
    if (!quantity || !price) {
      return NextResponse.json(
        { message: 'Missing required fields: quantity and price' },
        { status: 400 }
      );
    }

    const formData = new URLSearchParams();
    formData.append('quantity', quantity.toString());
    formData.append('price', price.toString());

    const response = await axios.post(
      ROUTES_API.ORDER.PURCHASE(bookId), 
      formData,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Cookie': `session=${sessionCookie.value}`,
        },
        withCredentials: true,
      }
    );

    return NextResponse.json(response.data, { status: response.status });
    
  } catch (error) {
    console.error('Purchase error:', error);
    
    if (axios.isAxiosError(error)) {
      const status = error.response?.status || 500;
      const message = error.response?.data?.message || 'Failed to make purchase';
      return NextResponse.json({ message }, { status });
    }
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}