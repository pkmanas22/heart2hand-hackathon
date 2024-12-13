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

const requests = [
  {
    id: 1,
    title: "Medical Assistance",
    category: "Medical",
    remark: "Ok",
    status: "Verified",
  },
  {
    id: 2,
    title: "School Fees Support",
    category: "Education",
    remark: "",
    status: "Pending",
  },
  {
    id: 3,
    title: "Food Supplies",
    category: "Food",
    status: "Rejected",
    remark: "Document mismatch",
  },
  {
    id: 4,
    title: "Rent Assistance",
    category: "Housing",
    status: "Verified",
    remark: "Ok",
  },
  {
    id: 5,
    title: "Medical Assistance",
    category: "Medical",
    remark: "Ok",
    status: "Verified",
  },
  {
    id: 6,
    title: "School Fees Support",
    category: "Education",
    remark: "",
    status: "Pending",
  },
  {
    id: 7,
    title: "Food Supplies",
    category: "Food",
    status: "Rejected",
    remark: "Document mismatch",
  },
  {
    id: 8,
    title: "Rent Assistance",
    category: "Housing",
    status: "Verified",
    remark: "Ok",
  },
  {
    id: 9,
    title: "Medical Assistance",
    category: "Medical",
    remark: "Ok",
    status: "Verified",
  },
  {
    id: 10,
    title: "School Fees Support",
    category: "Education",
    remark: "",
    status: "Pending",
  },
  {
    id: 11,
    title: "Food Supplies",
    category: "Food",
    status: "Rejected",
    remark: "Document mismatch",
  },
  {
    id: 12,
    title: "Rent Assistance",
    category: "Housing",
    status: "Verified",
    remark: "Ok",
  },
];

export function RequestHistory() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Verified":
        return "bg-green-500";
      case "Pending":
        return "bg-yellow-500";
      case "Rejected":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

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
                {(request.status === "Pending" ||
                  request.status === "Rejected") && (
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
