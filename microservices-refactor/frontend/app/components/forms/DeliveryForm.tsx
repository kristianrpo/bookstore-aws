"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ROUTES from "@/constants/urls";

interface DeliveryFormProps {
  purchaseId: string;
}

interface Provider {
  id: number;
  name: string;
  coverage_area: string;
  cost: number;
}

export default function DeliveryForm({ purchaseId }: DeliveryFormProps) {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [selectedProvider, setSelectedProvider] = useState('');
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await fetch(
          `/api/order/select-delivery/${purchaseId}`, {
            method: 'GET',
            credentials: 'include',
          });
        const data = await response.json();
        setProviders(data.providers || data.deliveries || []);
      } catch {
        setError("Failed to fetch delivery providers.");
      } finally {
        setLoading(false);
      }
    };
    fetchProviders();
  }, [purchaseId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!selectedProvider) {
      setError("Please select a delivery provider.");
      return;
    }
    try {
      await fetch(
        `/api/order/select-delivery/${purchaseId}`, {
          method: 'POST',
          credentials: 'include',
        });
      router.push(ROUTES.CATALOG);
    } catch {
      setError("Failed to assign delivery. Please try again.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <form onSubmit={handleSubmit} className="mt-3">
      <div className="mb-3">
        <label htmlFor="provider" className="form-label">Delivery Provider</label>
        <select
          id="provider"
          className="form-control"
          value={selectedProvider}
          onChange={e => setSelectedProvider(e.target.value)}
          required
        >
          <option value="">Select...</option>
          {providers.map((provider: Provider) => (
            <option key={provider.id} value={provider.id}>
              {provider.name} (Area: {provider.coverage_area}, Cost: {provider.cost})
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className="btn btn-primary w-100">Assign Delivery</button>
    </form>
  );
}
