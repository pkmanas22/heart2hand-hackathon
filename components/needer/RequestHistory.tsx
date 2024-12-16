"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RequestDetails } from "../admin/ManageRequests";
import { requestCollection } from "@/lib/firebase/config";
import { getDocs, query, where } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export function RequestHistory() {
  const [requests, setRequests] = useState<RequestDetails[]>([]);
  const { data: session, status } = useSession();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "bg-green-500";
      case "pending":
        return "bg-yellow-500";
      case "rejected":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  useEffect(() => {
    async function fetchData() {
      const q = query(requestCollection, where("userId", "==", session?.user.id))
      const requestDoc = await getDocs(q);
      const result = requestDoc.docs.map((doc) => {
        const data = doc.data();

        const filteredData: RequestDetails = {
          id: doc.id,
          youtubeVideoId: data.youtubeVideoId || "",
          story: data.story || "",
          name: data.name || "Unknown",
          amount: data.amount || 0,
          amountCollected: data.amountCollected || 0,
          userId: data.userId || "",
          address: data.address || "",
          status: data.status || "pending",
          createdAt: data.createdAt || new Date().toISOString(),
          supportingDocuments: data.supportingDocuments || [],
          age: data.age || 0,
          category: data.category || "uncategorized",
          phone: data.phone || "",
          title: data.title || "",
          remark: data.remark || "",
        };
        return filteredData;
      });
      setRequests(result);
    }
    fetchData();
  }, [session?.user.id]);

  if (status !== "authenticated") {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Request History</h2>
      <Table>
        <TableHeader>
          <TableRow className="text-center">
            <TableHead>Request Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Remark</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.map((request) => (
            <TableRow key={request.id}>
              <TableCell className="font-medium">
                <a href="#" className="text-blue-600 hover:underline">
                  {request.title}
                </a>
              </TableCell>
              <TableCell>{request.category}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(request.status)}>
                  {request.status}
                </Badge>
              </TableCell>
              <TableCell>{request.remark}</TableCell>
              <TableCell>
                {(request.status === "pending" ||
                  request.status === "rejected") && (
                  <div className="space-x-2">
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      Delete
                    </Button>
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
