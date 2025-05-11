import { NextResponse } from 'next/server';
import axios from 'axios';
import ROUTES_API from '@/constants/api.urls';
import { cookies } from 'next/headers';

export async function GET() {
    const cookieStore = cookies();
    const sessionCookie = (await cookieStore).get('session');

    try {
        const response = await axios.get(ROUTES_API.ORDER.MY_DELIVERIES, {
            headers: {
                'Cookie': `session=${sessionCookie?.value}`,
            },
            withCredentials: true,
        });

        if (response.status === 200) {
            return NextResponse.json(
                { message: 'Delivery created successfully' },
                { status: 200 }
            );
        } else {
            return NextResponse.json(
                { message: 'Failed to get my deliveries' },
                { status: response.status }
            );
        }        
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return NextResponse.json(
                { message: error.response.data.message || 'Failed to get my deliveries' },
                { status: error.response.status }
            );
        }
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}
