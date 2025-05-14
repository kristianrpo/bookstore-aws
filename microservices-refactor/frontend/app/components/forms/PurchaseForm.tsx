'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
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
      const response = await fetch(`/objective-3/api/order/purchase/${bookId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity, price }),
        credentials: 'include',
      });
    
      if (response.ok) {
        const data = await response.json();
        const purchaseId = data.purchase_id;
        router.push(`${ROUTES.PAYMENT}/${purchaseId}`);
      } else {
        const error = await response.json();
        alert(error.message || 'Failed to process purchase. Please try again.');
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