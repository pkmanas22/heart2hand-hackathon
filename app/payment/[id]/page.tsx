import Footer from "@/components/Footer";
import { PaymentForm } from "@/components/payment/PaymentForm";
import { Header } from "@/components/header";

export default async function PaymentPage({
  params,
}: {
  params: { id: string; };
}) {
  const { id } = await params;
  

  return (
    <div className="flex flex-col w-screen overflow-y-scroll">
      <Header />
      <PaymentForm
        requestId={id}
      />
      <Footer />
    </div>
  );
}
