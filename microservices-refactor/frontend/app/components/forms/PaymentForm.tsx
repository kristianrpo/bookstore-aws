'use client';

import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import ROUTES_API from '@/constants/api.urls';
import ROUTES from '@/constants/urls';

interface PaymentFormProps {
  purchaseId: string;
  amount: number;
}

export default function PaymentForm({ purchaseId, amount }: PaymentFormProps) {
  const [methods, setMethods] = useState<string[]>([]);
  const [selectedMethod, setSelectedMethod] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();
  console.log(purchaseId);
  console.log(amount);

  const getPaymentMethods = useCallback(async () => {
    try {
      const response = await axios.get(ROUTES_API.ORDER.PAYMENT(purchaseId), {
        withCredentials: true,
      });
      setMethods(response.data.methods || []);
    } catch (error) {
      setError('Failed to fetch payment methods. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [purchaseId]);

  useEffect(() => {
    getPaymentMethods();
  }, [getPaymentMethods]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!selectedMethod) {
      setError('Please select a payment method.');
      return;
    }

    try {
      const formData = new URLSearchParams();
      formData.append('method', selectedMethod);
      formData.append('amount', amount.toString());
      console.log(formData);

      const response = await axios.post(
        ROUTES_API.ORDER.PAYMENT(purchaseId),
        formData,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        router.push(`${ROUTES.DELIVERY}/${purchaseId}`);
      } else {
        setError(response.data.message || 'Payment failed');
      }
    } catch (err: any) {
      []
      setError('Payment failed. Please try again.');
    }
  };

  if (loading) return <div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <form onSubmit={handleSubmit} className="mt-3">
      <div className="mb-3">
        <label htmlFor="method" className="form-label">Payment Method</label>
        <select
          id="method"
          className="form-control"
          value={selectedMethod}
          onChange={e => setSelectedMethod(e.target.value)}
          required
        >
          <option value="">Select...</option>
          {methods.map(method => (
            <option key={method} value={method}>{method}</option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="amount" className="form-label">Amount</label>
        <input
          type="text"
          className="form-control"
          id="amount"
          value={amount}
          disabled
        />        
      </div>
      <button type="submit" className="btn btn-primary w-100">
        Pay
      </button>
    </form>
  );
}