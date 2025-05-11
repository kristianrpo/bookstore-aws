import { NextResponse } from 'next/server';
import axios from 'axios';
import ROUTES from '@/constants/urls';
import { cookies } from 'next/headers';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(
  request: Request,
  { params }: { params: Promise<{ filename: string }> }
) {
  const filename = (await params).filename;
  const cookieStore = cookies();
  const sessionCookie = (await cookieStore).get('session');

  try {
    const response = await axios.get(
      `${ROUTES.STATIC_SERVER}/images-book/${filename}`,
      {
        responseType: 'arraybuffer',
        headers: {
          "Cookie": `session=${sessionCookie?.value}`,
        },
        withCredentials: true,
      }
    );

    if (response.status === 200) {
      return new NextResponse(Buffer.from(response.data, 'binary'), {
        status: 200,
        headers: {
          'Content-Type': response.headers['content-type'],
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      });
    } else {
      return new NextResponse(null, { status: response.status });
    }
  } catch {
    return new NextResponse(null, { status: 500 });
  }
}