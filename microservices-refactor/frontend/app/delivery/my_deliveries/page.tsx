import axios from "axios";
import ROUTES_API from "@/constants/api.urls";
import { cookies } from 'next/headers'; 
import Link from "next/link";

interface Delivery {
  id: string;
  name: string;
  coverage_area: string;
  cost: number;
}

interface DeliveryResponse {
  deliveries: Delivery[];
}

export default async function MyDeliveries() {
  const cookieStore = cookies();
  const sessionCookie = (await cookieStore).get('session');
  let deliveries: Delivery[] = [];

  if (!sessionCookie) {
    return (
      <div className="container mt-4">
        <h2>Unauthorized</h2>
        <p>You are not authorized to access this page.</p>
      </div>
    );
  }

  try {
    const response = await axios.get<DeliveryResponse>(
      ROUTES_API.ORDER.MY_DELIVERIES,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Cookie": `session=${sessionCookie?.value}`,
        },
        withCredentials: true,
      }
    );
    if (response.status === 200) {
      deliveries = response.data["deliveries"];
    }
  } catch {
    deliveries = [];
  }

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
        <Link href="/delivery/create" className="btn btn-primary">Add new delivery</Link>
        <Link href="/book/catalog" className="btn btn-secondary">Return to catalog</Link>
      </div>
    </div>
  );
}