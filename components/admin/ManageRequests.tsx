"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// import { RequestStatistics } from "./request-statistics";
import { RequestDetailsModal } from "./request-details-modal";

// Mock data for pending requests
const pendingRequests = [
  {
    id: "001",
    name: "John Doe",
    category: "Medical",
    amount: 5000,
    date: "2023-05-15",
  },
  {
    id: "002",
    name: "Jane Smith",
    category: "Education",
    amount: 2000,
    date: "2023-05-16",
  },
  {
    id: "003",
    name: "Bob Johnson",
    category: "Housing",
    amount: 3500,
    date: "2023-05-17",
  },
];

export function ManageRequests() {
  const [category, setCategory] = useState("All");
  const [selectedRequest, setSelectedRequest] = useState(null);

  const filteredRequests = pendingRequests.filter(
    (request) =>
      (category === "All" || request.category === category)
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Pending Requests</CardTitle>
          <CardDescription>Manage and review incoming requests</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Filter by Category:</h3>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Categories</SelectItem>
                <SelectItem value="Medical">Medical</SelectItem>
                <SelectItem value="Education">Education</SelectItem>
                <SelectItem value="Housing">Housing</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Request ID</TableHead>
                <TableHead>Needer Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Submission Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRequests.map((request) => (
                <TableRow
                  key={request.id}
                  onClick={() => setSelectedRequest(request)}
                  className="cursor-pointer"
                >
                  <TableCell>{request.id}</TableCell>
                  <TableCell>{request.name}</TableCell>
                  <TableCell>{request.category}</TableCell>
                  <TableCell>${request.amount}</TableCell>
                  <TableCell>{request.date}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-green-500 hover:bg-green-600"
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-red-500 hover:bg-red-600"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {selectedRequest && (
        <RequestDetailsModal
          request={selectedRequest}
          onClose={() => setSelectedRequest(null)}
        />
      )}
    </div>
  );
}
