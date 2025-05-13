import { NextResponse } from 'next/server';
import axios from 'axios';
import ROUTES_API from '@/constants/api.urls';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
    try {
        const cookieStore = cookies();
        const sessionCookie = (await cookieStore).get('session');

        if (!sessionCookie) {
            return NextResponse.json(
                { message: 'Unauthorized: Session cookie not found' },
                { status: 401 }
            );
        }

        const { name, coverageArea, cost } = await request.json();

        if (!name || !coverageArea || !cost) {
            return NextResponse.json(
                { message: 'Missing required fields' },
                { status: 400 }
            );
        }

        console.log('Sending to API:', {
          name,
          coverage_area: coverageArea,
          cost: Number(cost)
        });

        const formData = new URLSearchParams();
        formData.append('name', name);
        formData.append('coverage_area', coverageArea);
        formData.append('cost', Number(cost).toString());
        
        const response = await axios.post(
            ROUTES_API.ORDER.CREATE_DELIVERY, 
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
        console.error('Delivery creation error:', error);
        
        if (axios.isAxiosError(error)) {
            const status = error.response?.status || 500;
            const message = error.response?.data?.message || 'Failed to create delivery';
            return NextResponse.json({ message }, { status });
        }
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}