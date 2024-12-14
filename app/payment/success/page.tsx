import { redirect } from "next/navigation";
import { getSessionDetails } from "@/lib/stripe/getSessionDetails";
import { SuccessCard } from "@/components/payment/SuccessCard";


export default async function SuccessPage({
  searchParams,
}: {
  searchParams: { session_id: string };
}) {
  const sessionId = searchParams?.session_id;

  if (!sessionId) {
    redirect("/");
  }

    const { session, amount } = await getSessionDetails(sessionId);
    console.log(session?.metadata?.requestId);
  return (
    <SuccessCard amount={amount} requestId={session?.metadata?.requestId} />
  );
}
