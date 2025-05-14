"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ROUTES from "@/constants/urls";

interface Delivery {
  id: string;
  name: string;
  coverage_area: string;
  cost: number;
}

export default function MyDeliveries() {
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDeliveries = async () => {
      try {
        const response = await fetch("/objective-3/api/order/my-deliveries", {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        setDeliveries(data.deliveries || []);
      } catch {
        setError("Error fetching deliveries");
      } finally {
        setLoading(false);
      }
    };
    fetchDeliveries();
  }, []);

  if (loading) return <div className="container mt-5">Loading...</div>;
  if (error) return <div className="container mt-5 text-danger">{error}</div>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">My Deliveries</h2>
      {deliveries.length > 0 ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Coverage Area</th>
              <th>Cost</th>
            </tr>
          </thead>
          <tbody>
            {deliveries.map((delivery) => (
              <tr key={delivery.id}>
                <td>{delivery.name}</td>
                <td>{delivery.coverage_area}</td>
                <td>${delivery.cost.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>You don&apos;t have deliveries yet</p>
      )}
      <div className="mt-4">
        <Link href={ROUTES.CREATE_DELIVERY} className="btn btn-primary">
          Add new delivery
        </Link>
        <Link href={ROUTES.CATALOG} className="btn btn-secondary">
          Return to catalog
        </Link>
      </div>
    </div>
  );
}