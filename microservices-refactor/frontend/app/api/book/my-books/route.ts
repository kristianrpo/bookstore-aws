import { NextResponse } from 'next/server';
import axios from 'axios';
import ROUTES_API from '@/constants/api.urls';
import { cookies } from 'next/headers';

export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  price: number;
  stock: number;
  image_path: string;
}

interface BookResponse {
  books: Book[];
}

export async function GET() {
  const cookieStore = cookies();
  const sessionCookie = (await cookieStore).get('session');

  try {
    const response = await axios.get<BookResponse>(
      ROUTES_API.BOOK.MY_BOOKS,
      {
        headers: {
          "Content-Type": "application/json",
          "Cookie": `session=${sessionCookie?.value}`,
        },
        withCredentials: true
      }
    );

    if (response.status === 200) {
      return NextResponse.json(response.data.books, { status: 200 });
    } else {
      return NextResponse.json([], { status: response.status });
    }
  } catch {
    return NextResponse.json([], { status: 500 });
  }
}