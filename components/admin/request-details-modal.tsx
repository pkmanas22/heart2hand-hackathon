"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function RequestDetailsModal({ request, onClose }) {
  return (
    <Dialog open={!!request} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Request Details</DialogTitle>
          <DialogDescription>
            Review the complete details of the request.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <h3 className="font-semibold">Personal Story</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
          </div>
          <div>
            <h3 className="font-semibold">Documents</h3>
            <p>Document1.pdf, Document2.jpg</p>
          </div>
          <div>
            <h3 className="font-semibold">Videos</h3>
            <p>Video1.mp4</p>
          </div>
          <div>
            <h3 className="font-semibold">Requested Amount</h3>
            <p>${request.amount}</p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button variant="default" className="bg-green-500 hover:bg-green-600">
            Approve
          </Button>
          <Button variant="destructive">Reject</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
