import { NextResponse } from 'next/server';
import axios from 'axios';
import ROUTES_API from '@/constants/api.urls';
import { cookies } from 'next/headers';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ purchase_id: string }> }
) {
    const purchase_id = (await params).purchase_id;
    const cookieStore = cookies();
    const sessionCookie = (await cookieStore).get('session');

    try {
        const response = await axios.get(ROUTES_API.ORDER.DELIVERY(purchase_id), {
            headers: { 
                'Cookie': `session=${sessionCookie?.value}`,
            },
            withCredentials: true,
        });

        if (response.status === 200) {
            return NextResponse.json(response.data, { status: 200 });
        } else {
            return NextResponse.json(
                { message: 'Failed to fetch delivery options' },
                { status: response.status }
            );
        }
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return NextResponse.json(
                { message: error.response.data.message || 'Failed to fetch delivery options' },
                { status: error.response.status }
            );
        }
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function POST(
    request: Request,
    { params }: { params: Promise<{ purchase_id: string }> }
  ) {
    const purchase_id = (await params).purchase_id;
    const cookieStore = cookies();
    const sessionCookie = (await cookieStore).get('session');

    try {
        const formData = await request.formData();

        const response = await axios.post(ROUTES_API.ORDER.DELIVERY(purchase_id), formData, {
            headers: { 
                'Content-Type': 'multipart/form-data',
                'Cookie': `session=${sessionCookie?.value}`,
            },
            withCredentials: true,
        });

        if (response.status === 201) {
            return NextResponse.json(
                { message: 'Delivery selected successfully' },
                { status: 201 }
            );
        } else {
            return NextResponse.json(
                { message: 'Failed to select delivery' },
                { status: response.status }
            );
        }
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return NextResponse.json(
                { message: error.response.data.message || 'Failed to select delivery' },
                { status: error.response.status }
            );
        }
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}