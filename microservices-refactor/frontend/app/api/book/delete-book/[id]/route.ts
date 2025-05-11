import { NextResponse } from 'next/server';
import axios from 'axios';
import { cookies } from 'next/headers';
import ROUTES_API from '@/constants/api.urls';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  const cookieStore = cookies();
  const sessionCookie = (await cookieStore).get('session');

  try {
    const response = await axios.delete(`${ROUTES_API.BOOK.DELETE_BOOK(id)}`, {
        headers: {
        'Content-Type': 'application/json',
        "Cookie": `session=${sessionCookie?.value}`,
        },
        withCredentials: true,
    });

    if (response.status === 204) {
      return NextResponse.json(
        { message: 'Book deleted successfully' },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: 'Failed to delete book' },
        { status: response.status }
      );
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return NextResponse.json(
        { message: error.response.data.message || 'Failed to delete book' },
        { status: error.response.status }
      );
    }
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}