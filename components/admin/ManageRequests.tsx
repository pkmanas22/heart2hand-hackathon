"use client";

import { useEffect, useState } from "react";
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
import { getDocs } from "firebase/firestore";
import { requestCollection } from "@/lib/firebase/config";

export interface RequestDetails {
  id: string;
  youtubeUrl: string;
  story: string;
  name: string;
  amount: number;
  userId: string;
  address: string;
  status: string;
  createdAt: string;
  supportingDocuments: string[];
  age: number;
  category: string;
  phone: string;
}

export function ManageRequests() {
  const [status, setStatus] = useState("all");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [requests, setRequests] = useState<RequestDetails[]>([]);

  const filteredRequests = requests.filter(
    (request) => status === "all" || request.status === status
  );

  useEffect(() => {
    async function fetchData() {
      const requestDoc = await getDocs(requestCollection);
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

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>All Requests</CardTitle>
          <CardDescription>Manage and review all requests</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Filter by Status:</h3>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="verified">Verified</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Serial No</TableHead>
                <TableHead>Needer Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Submission Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRequests.map((request, index) => (
                <TableRow
                  key={request.id}
                  onClick={() => setSelectedRequest(request)}
                  className={`cursor-pointer ${
                    request.status === "verified" &&
                    "bg-green-200 hover:bg-green-300"
                  } ${
                    request.status === "rejected" &&
                    "bg-red-200 hover:bg-red-300"
                  }`}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{request.name}</TableCell>
                  <TableCell>{request.category}</TableCell>
                  <TableCell>INR {request.amount}</TableCell>
                  <TableCell>
                    {new Date(request.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-green-500 hover:bg-green-600"
                        disabled={request.status !== "pending"}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-red-500 hover:bg-red-600"
                        disabled={request.status !== "pending"}
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
