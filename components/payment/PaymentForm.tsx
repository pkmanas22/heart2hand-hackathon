"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createCheckoutSession } from "@/lib/stripe/action";
import { useSession } from "next-auth/react";
import { requestCollection, userCollection } from "@/lib/firebase/config";
import { getDoc, doc } from "firebase/firestore";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export interface RequestDetails {
  id: string;
  name: string;
  title: string;
  topic: string;
  category: string;
  status: string;
  description: string;
  amount: number;
}

export function PaymentForm({ requestId }: { requestId: string }) {
  const { data: session, status } = useSession();
  const [request, setRequest] = useState<RequestDetails | null>(null);
  const [donorEmail, setDonorEmail] = useState("");
  const router = useRouter();
  const userId = session?.user.id;
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    }
  }, [status, router]);

  useEffect(() => {
    async function fetchData() {
      if (!userId) return;

      try {
        const requestDoc = await getDoc(doc(requestCollection, requestId));

        if (!requestDoc.exists()) {
          alert("Invalid id! No data found");
          router.push("/dashboard");
          return;
        }

        const data = requestDoc.data() as Omit<RequestDetails, "id">;

        if (data.status !== "verified") {
          alert("Wait for admin approval");
          router.push("/dashboard");
          return;
        }

        setRequest({ id: requestDoc.id, ...data });

        const userDoc = await getDoc(doc(userCollection, userId));
        const user = userDoc.data();
        if (user) {
          setDonorEmail(user.email);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [requestId, userId, router]);

  if (!request) {
    return <div>Loading...</div>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const sessionUrl = await createCheckoutSession({
        amount,
        requestId,
        donorEmail,
        recipientName: request.name,
        requestTitle: request.title,
      });
      router.push(sessionUrl);
    } catch (error) {
      console.error("Failed to create checkout session:", error);
      setIsLoading(false);
      // Here you could set an error state and display it to the user
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{request.title}</CardTitle>
        <CardDescription>
          Support this request by making a donation
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mb-6">
          <div>
            <strong>Requester:</strong> {request.name}
          </div>
          <div>
            <strong>Topic:</strong> {request.title}
          </div>
          <div>
            <strong>Category:</strong> {request.category}
          </div>
          <div>
            <strong>Requested Amount:</strong> ₹{request.amount}
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-700"
            >
              Donation Amount (in ₹)
            </label>
            <Input
              type="number"
              id="amount"
              value={amount / 100} // Convert to rupees for display
              onChange={(e) =>
                setAmount(Math.round(parseFloat(e.target.value) * 100))
              } // Convert back to paise
              required
              min="1"
              step="0.01"
              className="mt-1"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Donate Now"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
