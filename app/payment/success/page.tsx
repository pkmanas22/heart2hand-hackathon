import { redirect } from "next/navigation";
import { getSessionDetails } from "@/lib/stripe/getSessionDetails";
import { SuccessCard } from "@/components/payment/SuccessCard";

type tSearchParams = Promise<{ session_id: string }>;

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: tSearchParams;
  }) {
    const sessionId = await (await searchParams)?.session_id;

    if (!sessionId) {
      redirect("/");
    }

    const { session, amount } = await getSessionDetails(sessionId);
    // console.log(session?.metadata?.requestId);
    return (
      <SuccessCard amount={amount} requestId={session?.metadata?.requestId} />
    );
  }
