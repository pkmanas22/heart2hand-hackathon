"use client";

import { useState } from "react";
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

const mockRequests = [
  {
    id: 1,
    title: "Medical Treatment for Sarah",
    neederName: "Sarah Johnson",
    category: "Medical",
    requestedAmount: 5000,
    urgencyLevel: "High",
  },
  {
    id: 2,
    title: "School Supplies for Underprivileged Children",
    neederName: "Education for All Foundation",
    category: "Education",
    requestedAmount: 2000,
    urgencyLevel: "Medium",
  },
  // Add more mock requests here
];

export default function VerifiedRequest() {
  const [category, setCategory] = useState("All");
  const [urgency, setUrgency] = useState("All");

  const filteredRequests = mockRequests.filter(
    (request) =>
      (category === "All" || request.category === category) &&
      (urgency === "All" || request.urgencyLevel === urgency)
  );

  return (
    <div className="space-y-4">
      <div className="flex space-x-4">
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Categories</SelectItem>
            <SelectItem value="Medical">Medical</SelectItem>
            <SelectItem value="Education">Education</SelectItem>
            {/* Add more categories */}
          </SelectContent>
        </Select>
        <Select value={urgency} onValueChange={setUrgency}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select urgency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Urgencies</SelectItem>
            <SelectItem value="Low">Low</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="High">High</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRequests.map((request) => (
          <Card key={request.id}>
            <CardHeader>
              <CardTitle>{request.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Needer: {request.neederName}</p>
              <p>Category: {request.category}</p>
              <p>Requested Amount: ${request.requestedAmount}</p>
              <Badge
                variant={
                  request.urgencyLevel === "High"
                    ? "destructive"
                    : request.urgencyLevel === "Medium"
                    ? "default"
                    : "secondary"
                }
              >
                {request.urgencyLevel} Urgency
              </Badge>
            </CardContent>
            <CardFooter>
              <Button>Donate Now</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
