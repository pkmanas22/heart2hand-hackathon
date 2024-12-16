"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { RequestDetails } from "../admin/ManageRequests";
import { getDocs, query, where } from "firebase/firestore";
import { requestCollection } from "@/lib/firebase/config";
import Link from "next/link";

export default function VerifiedRequest() {
  const [category, setCategory] = useState("all");
  const [requests, setRequests] = useState<RequestDetails[]>([]);

  const filteredRequests = requests.filter(
    (request) => category === "all" || request.category === category
  );

  useEffect(() => {
    async function fetchData() {
      const q = query(requestCollection, where("status", "==", "verified"));

      const requestDoc = await getDocs(q);
      const result = requestDoc.docs.map((doc) => {
        const data = doc.data();

        const filteredData = {
          id: doc.id,
          ...data,
        };
        return filteredData;
      });
      setRequests(result);
    }
    fetchData();
  }, []);

  // console.log(requests);

  return (
    <div className="space-y-4">
      <div className="flex space-x-4">
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="medical">Medical</SelectItem>
            <SelectItem value="education">Education</SelectItem>
            <SelectItem value="housing">Housing</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRequests.map((request) => (
          <Card key={request.id}>
            <CardHeader>
              <CardTitle>{request.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>Needer: {request.name}</p>
              <p>Requested Amount: INR {request.amount}</p>
              <p>Amount Collected: INR {request.amountCollected}</p>
              <Badge variant="outline">{request.category.toUpperCase()}</Badge>
            </CardContent>
            <CardFooter className="flex justify-evenly">
              <Button>
                <Link href={`/payment/${request.id}`}>
                  Donate Now
                </Link>
              </Button>
              <Button className="bg-blue-700 hover:bg-blue-500 text-white">
                <Link href={`/request/${request.id}`} target="_blank">
                  View Story
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
