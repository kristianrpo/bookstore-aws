import DeliveryForm from '@/app/components/forms/DeliveryForm';

export default function DeliveryPage({ params }: { params: { purchaseId: string } }) {
  return (
    <div className="container mt-4">
      <h2>Select Delivery Provider</h2>
      <DeliveryForm purchaseId={params.purchaseId} />
    </div>
  );
}
