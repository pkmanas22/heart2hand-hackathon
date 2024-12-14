"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface SuccessCardProps {
  amount: number;
  requestId?: string;
}

export function SuccessCard({ amount, requestId }: SuccessCardProps) {
    const router = useRouter();
    
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md text-center">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Thank you for your donation!
      </h1>
      <p className="text-gray-600 mb-2">Amount: ₹{amount.toFixed(2)}</p>
      <p className="text-gray-600 mb-4">
        Date: {new Date().toLocaleDateString()}
      </p>
      <Button
        onClick={() => {
          router.push(`/request/${requestId}`);
        }}
        className="bg-green-500 hover:bg-green-600 text-white"
      >
        Return to Request Details
      </Button>
    </div>
  );
}
