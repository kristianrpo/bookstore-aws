"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ROUTES from "@/constants/urls";

export default function CreateDelivery() {
  const [name, setName] = useState("");
  const [coverageArea, setCoverageArea] = useState("");
  const [cost, setCost] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name || !coverageArea || !cost) {
      setError("All fields are required.");
      return;
    }

    try {
      const response = await fetch('/objective-3/api/order/create-delivery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, coverageArea, cost }),
        credentials: 'include',
      });

      if (response.ok) {
        setSuccess("Delivery created successfully!");
        setTimeout(() => router.push(ROUTES.MY_DELIVERIES), 1000);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to create delivery');
      }
    } catch {
      setError("Failed to create delivery. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-3">
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Name</label>
        <input
          type="text"
          className="form-control"
          id="name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="coverageArea" className="form-label">Coverage Area</label>
        <input
          type="text"
          className="form-control"
          id="coverageArea"
          value={coverageArea}
          onChange={e => setCoverageArea(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="cost" className="form-label">Cost</label>
        <input
          type="number"
          className="form-control"
          id="cost"
          value={cost}
          onChange={e => setCost(e.target.value)}
          required
        />
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <button type="submit" className="btn btn-primary w-100">Create Delivery</button>
    </form>
  );
}
