import { NextResponse } from 'next/server';
import axios from 'axios';
import ROUTES_API from '@/constants/api.urls';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
    const cookieStore = cookies();
    const sessionCookie = (await cookieStore).get('session');

    try {
        const formData = await request.formData();
        
        const response = await axios.post(ROUTES_API.ORDER.CREATE_DELIVERY, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Cookie': `session=${sessionCookie?.value}`,
            },
            withCredentials: true,
        });
        
        if (response.status === 201) {
            return NextResponse.json(
                { message: 'Delivery created successfully' },
                { status: 201 }
            );
        } else {
            return NextResponse.json(
                { message: 'Failed to create delivery' },
                { status: response.status }
            );
        }
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return NextResponse.json(
                { message: error.response.data.message || 'Failed to create delivery' },
                { status: error.response.status }
            );
        }
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}