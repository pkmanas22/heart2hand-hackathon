"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { requestCollection } from "@/lib/firebase/config";

interface SuccessCardProps {
  amount: number;
  requestId?: string;
}

export function SuccessCard({ amount, requestId }: SuccessCardProps) {
  const router = useRouter();

  useEffect(() => {
    const updateAmount = async () => {
      try {
        const requestDoc = await getDoc(doc(requestCollection, requestId));

        if (!requestDoc.exists()) {
          alert("Invalid id! No data found");
          router.push("/dashboard");
          return;
        }

        const data = requestDoc.data();
        await updateDoc(doc(requestCollection, requestId), {
          amountCollected: data.amountCollected + (amount/100)
        });
      } catch (error) {
        console.error(error);
      }
    };
    updateAmount();
  }, [amount, requestId, router]);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md text-center">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Thank you for your donation!
      </h1>
      <p className="text-gray-600 mb-2">Amount: ₹{(amount/100).toFixed(2)}</p>
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
