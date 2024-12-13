import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const mockDonations = [
  {
    id: 1,
    requestTitle: "Medical Treatment for Sarah",
    amountDonated: 100,
    dateOfDonation: "2023-05-15",
    gratitudeMessage: "Thank you so much for your generous donation!",
  },
  {
    id: 2,
    requestTitle: "School Supplies for Underprivileged Children",
    amountDonated: 50,
    dateOfDonation: "2023-05-10",
    gratitudeMessage:
      "Your donation will help many children get the supplies they need.",
  },
  // Add more mock donations here
];

export default function DonationHistory() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Request Title</TableHead>
          <TableHead>Amount Donated</TableHead>
          <TableHead>Date of Donation</TableHead>
          <TableHead>Gratitude Message</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {mockDonations.map((donation) => (
          <TableRow key={donation.id}>
            <TableCell>{donation.requestTitle}</TableCell>
            <TableCell>${donation.amountDonated}</TableCell>
            <TableCell>{donation.dateOfDonation}</TableCell>
            <TableCell>{donation.gratitudeMessage.slice(0, 50)}...</TableCell>
            <TableCell>
              <Button variant="outline" size="sm">
                View Full Message
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
