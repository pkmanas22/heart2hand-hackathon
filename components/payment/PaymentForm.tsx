"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createCheckoutSession } from "@/lib/stripe/action";

interface PaymentFormProps {
  initialAmount: number;
  requestId: string;
  recipientName: string;
  requestTitle: string;
}

export function PaymentForm({
  initialAmount,
  requestId,
  recipientName,
  requestTitle,
}: PaymentFormProps) {
  const [amount, setAmount] = useState(initialAmount);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const sessionUrl = await createCheckoutSession({
        amount,
        requestId,
        donorEmail: "", // Stripe Checkout will collect this
        recipientName,
        requestTitle,
      });
      router.push(sessionUrl);
    } catch (error) {
      console.error("Failed to create checkout session:", error);
      setIsLoading(false);
      // Here you could set an error state and display it to the user
    }
  };

  return (
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
  );
}
