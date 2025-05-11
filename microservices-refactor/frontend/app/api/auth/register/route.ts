import { NextResponse } from 'next/server';
import axios from 'axios';
import ROUTES_API from '@/constants/api.urls';

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json(
      { message: "Name, email and password are required" }, 
      { status: 400 }
    );
  }

  try {
    const formData = new URLSearchParams();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);

    const response = await axios.post(
      ROUTES_API.AUTH.REGISTER,
      formData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        withCredentials: true,
      }
    );

    if (response.status === 201) {
      const nextResponse = NextResponse.json(
        { message: 'Registration successful' }, 
        { status: 201 }
      );
      
      return nextResponse;
    } else {
      return NextResponse.json(
        { message: 'Registration failed' }, 
        { status: response.status }
      );
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return NextResponse.json(
        { message: error.response.data.message || 'Registration failed' },
        { status: error.response.status }
      );
    }
    return NextResponse.json(
      { message: "Unknown error during registration" }, 
      { status: 500 }
    );
  }
}