import { NextResponse } from 'next/server';
import axios from 'axios';
import ROUTES_API from '@/constants/api.urls';

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
  }

  try {
    const formData = new URLSearchParams();
    formData.append("email", email);
    formData.append("password", password);

    const response = await axios.post(
      ROUTES_API.AUTH.LOGIN, 
      formData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        withCredentials: true,
      }
    );

    if (response.status === 200) {
      console.log('Login successful', response);
      
      const nextResponse = NextResponse.json(
        { message: 'Login successful' }, 
        { status: 200 }
      );
      
      const setCookieHeader = response.headers['set-cookie'];
      if (setCookieHeader && setCookieHeader.length > 0) {
        setCookieHeader.forEach(cookie => {
          nextResponse.headers.append('set-cookie', cookie);
        });
      }
      
      return nextResponse;

    } else {
      return NextResponse.json({ message: 'Failed to authenticate' }, { status: response.status });
    }

  } catch {
    return NextResponse.json({ message: "Unknown error" }, { status: 500 });
  }
}