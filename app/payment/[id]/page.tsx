import { PaymentForm } from "@/components/payment/PaymentForm";
import { getRequestDetails } from "@/lib/stripe/getRequestDetails";

export default async function PaymentPage({
  params,
}: {
  params: { id: string; };
}) {
  const { id } = await params;
  console.log(id);
  const { recipientName, requestTitle, amount } = getRequestDetails(id);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Donation Details
      </h1>
      <p className="text-gray-600 mb-2">Recipient: {recipientName}</p>
      <p className="text-gray-600 mb-4">Request: {requestTitle}</p>
      <PaymentForm
        initialAmount={amount}
        requestId={id}
        recipientName={recipientName}
        requestTitle={requestTitle}
      />
    </div>
  );
}