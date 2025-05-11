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
        const response = await axios.get(ROUTES_API.ORDER.PAYMENT(purchase_id), {
            headers: {
                'Cookie': `session=${sessionCookie?.value}`,
            },
            withCredentials: true,
        });

        if (response.status === 200) {
            return NextResponse.json({
                message: response.data.message,
                purchase_id: response.data.purchase_id,
                amount: response.data.amount,
                methods: response.data.methods
            }, { status: 200 });
        } else {
            return NextResponse.json(
                { message: 'Failed to fetch payment options' },
                { status: response.status }
            );
        }
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return NextResponse.json(
                { message: error.response.data.message || 'Failed to fetch payment options' },
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
        const method = formData.get('method');
        const amount = formData.get('amount');
        
        if (!method || !amount) {
            return NextResponse.json(
                { message: 'Missing payment method or amount' },
                { status: 400 }
            );
        }

        const response = await axios.post(ROUTES_API.ORDER.PAYMENT(purchase_id), formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Cookie': `session=${sessionCookie?.value}`,
            },
            withCredentials: true,
        });

        if (response.status === 200) {
            return NextResponse.json({
                message: response.data.message,
                purchase_id: response.data.purchase_id,
                amount: response.data.amount
            }, { status: 200 });
        } else {
            return NextResponse.json(
                { message: 'Failed to process payment' },
                { status: response.status }
            );
        }
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return NextResponse.json(
                { message: error.response.data.message || 'Failed to process payment' },
                { status: error.response.status }
            );
        }
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}