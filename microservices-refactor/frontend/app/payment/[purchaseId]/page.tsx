'use client';

import { use, useEffect, useState } from 'react';
import PaymentForm from '@/app/components/forms/PaymentForm';
import axios from 'axios';
import ROUTES_API from '@/constants/api.urls';

export default function PaymentPage({ params }: { params: Promise<{ purchaseId: string }> }) {
  const { purchaseId } = use(params);
  const [amount, setAmount] = useState<number | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPurchaseDetails = async () => {
      try {
        const response = await axios.get(ROUTES_API.ORDER.PAYMENT(purchaseId), {
          withCredentials: true,
        });
        setAmount(response.data.amount || 0);
      } catch {
        setError('Failed to fetch purchase details');
      }
    };

    fetchPurchaseDetails();
  }, [purchaseId]);

  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!amount) return <div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div>;

  return (
    <div className="container mt-4">
      <h2>Payment</h2>
      <PaymentForm purchaseId={purchaseId} amount={amount} />
    </div>
  );
}