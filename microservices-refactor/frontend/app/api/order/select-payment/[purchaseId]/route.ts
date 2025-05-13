import { NextResponse } from 'next/server';
import axios from 'axios';
import ROUTES_API from '@/constants/api.urls';
import { cookies } from 'next/headers';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ purchaseId: string }> }
) {
    const purchaseId = (await params).purchaseId;
    const cookieStore = cookies();
    const sessionCookie = (await cookieStore).get('session');

    try {
        const response = await axios.get(ROUTES_API.ORDER.PAYMENT(purchaseId), {
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
    { params }: { params: Promise<{ purchaseId: string }> }
) {
    try {
        const { purchaseId } = await params;
        const cookieStore = await cookies();
        const sessionCookie = cookieStore.get('session');

        if (!sessionCookie) {
            return NextResponse.json(
                { message: 'Unauthorized: Session cookie not found' },
                { status: 401 }
            );
        }

        const { selectedMethod, amount } = await request.json();

        if (!selectedMethod || !amount) {
            return NextResponse.json(
                { message: 'Missing payment method or amount' },
                { status: 400 }
            );
        }

        const formData = new URLSearchParams();
        formData.append('method', selectedMethod);
        formData.append('amount', amount.toString());

        const response = await axios.post(
            ROUTES_API.ORDER.PAYMENT(purchaseId), 
            formData,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Cookie': `session=${sessionCookie?.value}`,
                },
                withCredentials: true,
            }
        );

        return NextResponse.json(response.data, { status: response.status });

    } catch (error) {
        console.error('Payment error:', error);

        if (axios.isAxiosError(error)) {
            const status = error.response?.status || 500;
            const message = error.response?.data?.message || 'Failed to process payment';
            return NextResponse.json({ message }, { status });
        }
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}