import { NextResponse } from 'next/server';
import axios from 'axios';
import { cookies } from 'next/headers';
import ROUTES_API from '@/constants/api.urls';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  const cookieStore = cookies();
  const sessionCookie = (await cookieStore).get('session');

  try {
    const formData = await request.formData();
    
    const response = await axios.patch(ROUTES_API.BOOK.EDIT_BOOK(id), formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Cookie': `session=${sessionCookie?.value}`,
      },
      withCredentials: true,
    });

    if (response.status === 200) {
      return NextResponse.json(
        { message: 'Book updated successfully' },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: 'Failed to add book' },
        { status: response.status }
      );
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return NextResponse.json(
        { message: error.response.data.message || 'Failed to add book' },
        { status: error.response.status }
      );
    }
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}