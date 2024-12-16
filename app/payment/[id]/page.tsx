import { PaymentForm } from "@/components/payment/PaymentForm";
import { Header } from "@/components/header";
import DummyPayment from "@/components/payment/DummyPayment";

type tParams = Promise<{ id: string }>;
export default async function PaymentPage({ params }: { params: tParams }) {
  const { id } = await params;
  const isProd = process.env.NODE_ENV === "production";
  return (
    <div className="flex flex-col w-screen overflow-y-scroll">
      <Header />
      {isProd ? <DummyPayment requestId={id} /> : <PaymentForm requestId={id} />}
    </div>
  );
}
