'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import ROUTES_API from '@/constants/api.urls';
import ROUTES from '@/constants/urls';

interface PurchaseFormProps {
  bookId: string;
  price: number;
  stock: number;
}

export default function PurchaseForm({ bookId, price, stock }: PurchaseFormProps) {
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handlePurchase = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new URLSearchParams();
      formData.append('quantity', quantity.toString());
      formData.append('price', price.toString());
      const response = await axios.post(
        `${ROUTES_API.ORDER.PURCHASE(bookId)}`,
        formData,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        const purchaseId = response.data.purchase_id;
        router.push(`${ROUTES.PAYMENT}/${purchaseId}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to process purchase. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handlePurchase} className="mt-3">
      <div className="mb-3">
        <label htmlFor={`quantity-${bookId}`} className="form-label">
          Quantity
        </label>
        <input
          type="number"
          className="form-control"
          id={`quantity-${bookId}`}
          min="1"
          max={stock}
          value={quantity}
          onChange={(e) => setQuantity(Math.min(parseInt(e.target.value) || 1, stock))}
        />
      </div>

      <div className="mb-3">
        <strong>Total: ${(price * quantity).toFixed(2)}</strong>
      </div>

      <button
        type="submit"
        className={`btn w-100 ${stock === 0 ? 'btn-secondary' : 'btn-primary'}`}
        disabled={isLoading || stock === 0}
      >
        {isLoading ? (
          <>
            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            Processing...
          </>
        ) : stock === 0 ? (
          'Out of Stock'
        ) : (
          'Buy'
        )}
      </button>
    </form>
  );
} 