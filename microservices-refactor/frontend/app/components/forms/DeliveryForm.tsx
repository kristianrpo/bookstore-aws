"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import ROUTES_API from "@/constants/api.urls";
import { useRouter } from "next/navigation";
import ROUTES from "@/constants/urls";

interface DeliveryFormProps {
  purchaseId: string;
}

export default function DeliveryForm({ purchaseId }: DeliveryFormProps) {
  const [providers, setProviders] = useState<any[]>([]);
  const [selectedProvider, setSelectedProvider] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await axios.get(ROUTES_API.ORDER.DELIVERY(purchaseId), {
          withCredentials: true,
        });
        setProviders(response.data.providers || response.data.deliveries || []);
      } catch (err) {
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
      const formData = new URLSearchParams();
      formData.append("provider_id", selectedProvider);
      await axios.post(
        ROUTES_API.ORDER.DELIVERY(purchaseId),
        formData,
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          withCredentials: true,
        }
      );
      router.push(ROUTES.CATALOG);
    } catch (err) {
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
          {providers.map((provider: any) => (
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
