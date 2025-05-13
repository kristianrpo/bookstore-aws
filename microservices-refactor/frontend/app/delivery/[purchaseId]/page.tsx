import DeliveryForm from "@/app/components/forms/DeliveryForm";

interface PageProps {
  params: Promise<{ purchaseId: string }>;
}

export default async function DeliveryPage({ params }: PageProps) {
  const pathParams = await params;
  
  return (
    <div className="container mt-4">
      <h2>Select Delivery Provider</h2>
      <DeliveryForm purchaseId={pathParams.purchaseId} />
    </div>
  );
}