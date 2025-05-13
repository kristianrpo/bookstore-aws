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
        const response = await axios.get(ROUTES_API.ORDER.DELIVERY(purchaseId), {
            headers: { 
                'Cookie': `session=${sessionCookie?.value}`,
            },
            withCredentials: true,
        });

        if (response.status === 200) {
            return NextResponse.json({ 
                message: response.data.message,
                purchase_id: response.data.purchase_id,
                providers: response.data.providers
            }, { status: 200 });
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

        const formData = await request.formData();
        const provider = formData.get('provider');

        if (!provider) {
            return NextResponse.json(
                { message: 'Missing provider' },
                { status: 400 }
            );
        }

        const apiFormData = new URLSearchParams();
        apiFormData.append('provider_id', provider as string);

        const response = await axios.post(
            ROUTES_API.ORDER.DELIVERY(purchaseId),
            apiFormData,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Cookie': `session=${sessionCookie?.value}`,
                },
                withCredentials: true,
            }
        );

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