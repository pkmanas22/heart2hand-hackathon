"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { requestCollection } from "@/lib/firebase/config";
import { getDoc, doc, updateDoc } from "firebase/firestore";

export default function DummyPayment({ requestId }: { requestId: string }) {
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [amount, setAmount] = useState(0);
  const [showDialog, setShowDialog] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate payment processing
    setTimeout(() => {
      setShowDialog(true);
    }, 1000);

    try {
      const requestDoc = await getDoc(doc(requestCollection, requestId));

      if (!requestDoc.exists()) {
        alert("Invalid id! No data found");
        router.push("/dashboard");
        return;
      }

      const data = requestDoc.data();
      await updateDoc(doc(requestCollection, requestId), {
        amountCollected: data.amountCollected + (amount / 100),
      });
        console.log(data)
    } catch (error) {
      console.error(error);
    }
  };

  const handleConfirm = () => {
    // setShowDialog(false);
    router.push(`/request/${requestId}`);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return `${v.slice(0, 2)}/${v.slice(2, 4)}`;
    }
    return v;
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-md mx-auto text-black">
        <CardContent className="p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold">Payment Details</h2>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cardNumber" className="text-black">
                Card Number
              </Label>
              <Input
                id="cardNumber"
                value={cardNumber}
                onChange={(e) =>
                  setCardNumber(formatCardNumber(e.target.value))
                }
                maxLength={19}
                className="bg-black/20 border-black/40 text-black placeholder-black/60"
                placeholder="1234 5678 9012 3456"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cardName" className="text-black">
                Cardholder Name
              </Label>
              <Input
                id="cardName"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                className="bg-black/20 border-black/40 text-black placeholder-black/60"
                placeholder="John Doe"
                required
              />
            </div>
            <div className="flex space-x-4">
              <div className="space-y-2 flex-1">
                <Label htmlFor="expiryDate" className="text-black">
                  Expiry Date
                </Label>
                <Input
                  id="expiryDate"
                  value={expiryDate}
                  onChange={(e) =>
                    setExpiryDate(formatExpiryDate(e.target.value))
                  }
                  maxLength={5}
                  className="bg-black/20 border-black/40 text-black placeholder-black/60"
                  placeholder="MM/YY"
                  required
                />
              </div>
              <div className="space-y-2 flex-1">
                <Label htmlFor="cvv" className="text-black">
                  CVV
                </Label>
                <Input
                  id="cvv"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  maxLength={3}
                  className="bg-black/20 border-black/40 text-black placeholder-black/60"
                  placeholder="123"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount" className="text-black">
                Amount
              </Label>
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
              className="w-full bg-purple-500 text-purple-600 hover:bg-purple-100"
            >
              Pay Now
            </Button>
          </form>
        </CardContent>
      </Card>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Payment Successful</DialogTitle>
            <DialogDescription>
              Your payment of INR {amount / 100} has been processed successfully.
            </DialogDescription>
          </DialogHeader>
          <Button onClick={handleConfirm}>Go to Request</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
