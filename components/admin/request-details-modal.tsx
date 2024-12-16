"use client";

import * as React from "react";
import { BadgeCheck, BadgeX } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { doc, updateDoc } from "firebase/firestore";
import { requestCollection } from "@/lib/firebase/config";
import { RequestDetails } from "./ManageRequests";

export function RequestDetailsModal({
  request,
  onClose,
}: {
  request: RequestDetails;
  onClose: () => void;
}) {
  const [confirmationDialog, setConfirmationDialog] = useState({
    open: false,
    action: "",
  });
  const [title, setTitle] = useState("");
  const [remark, setRemark] = useState("");

  if (!request) return null;

  const handleUpdate = async (status: string) => {
    try {
      await updateDoc(doc(requestCollection, request.id), {
        status,
        title,
        remark,
      });
      alert("Updated successfully");
    } catch (error) {
      // console.log(error);
      alert("Error while updating", error.message);
    } finally {
      setConfirmationDialog({ open: false, action: "" });
      setTitle("");
      setRemark("");
      window.location.reload();
    }
  };

  return (
    <>
      <Dialog open={!!request} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              Request Details
              <Badge
                variant={
                  request.status === "rejected" ? "destructive" : "default"
                }
              >
                {request.status}
              </Badge>
            </DialogTitle>
            <DialogDescription>
              Review the complete details of the request.
            </DialogDescription>
          </DialogHeader>

          {/* Scrollable Area */}
          <ScrollArea className="flex-1 overflow-y-auto">
            <div className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-sm text-muted-foreground">
                    Name
                  </h3>
                  <p>{request.name}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-muted-foreground">
                    Age
                  </h3>
                  <p>{request.age}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-muted-foreground">
                    Category
                  </h3>
                  <p className="capitalize">{request.category}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-muted-foreground">
                    Phone
                  </h3>
                  <p>{request.phone}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-muted-foreground">
                    Address
                  </h3>
                  <p>{request.address}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-muted-foreground">
                    Requested Amount
                  </h3>
                  <p>${request.amount.toLocaleString()}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-muted-foreground">
                    Created At
                  </h3>
                  <p>{new Date(request.createdAt).toLocaleString()}</p>
                </div>
              </div>

              <Separator />

              {/* Personal Story */}
              <div>
                <h3 className="font-semibold mb-2">Personal Story</h3>
                <p className="text-sm text-muted-foreground break-words overflow-wrap">
                  {request.story}
                </p>
              </div>

              <Separator />

              {/* Supporting Documents */}
              <div>
                <h3 className="font-semibold mb-2">Supporting Documents</h3>
                <div className="m-auto">
                  <Carousel className="max-w-xs">
                    <CarouselPrevious />
                    <CarouselContent>
                      {request.supportingDocuments.map((doc, index) => (
                        <CarouselItem key={index}>
                          <div className="p-1">
                            <Image
                              src={doc}
                              alt={`Supporting document ${index + 1}`}
                              width={300}
                              height={200}
                              className="rounded-lg object-cover w-full h-48"
                            />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselNext />
                  </Carousel>
                </div>
              </div>

              <Separator />

              {/* YouTube Video */}
              <div>
                <h3 className="font-semibold mb-2">Video Submission</h3>
                <div className="aspect-video">
                  <iframe
                    width="70%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${request.youtubeVideoId}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-lg"
                  />
                </div>
              </div>
            </div>
          </ScrollArea>

          {/* Footer */}
          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button
              disabled={request.status !== "pending"}
              variant="destructive"
              className="gap-2"
              onClick={() =>
                setConfirmationDialog({ open: true, action: "rejected" })
              }
            >
              <BadgeX className="w-4 h-4" />
              Reject
            </Button>
            <Button
              disabled={request.status !== "pending"}
              variant="default"
              className="gap-2 bg-green-600 hover:bg-green-400"
              onClick={() =>
                setConfirmationDialog({ open: true, action: "verified" })
              }
            >
              <BadgeCheck className="w-4 h-4" />
              Approve
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog
        open={confirmationDialog.open}
        onOpenChange={() => setConfirmationDialog({ open: false, action: "" })}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {confirmationDialog.action === "verified" ? "Approve" : "Reject"}{" "}
              Request
            </DialogTitle>
            <DialogDescription>
              Please provide a title and remark for this action.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="remark" className="text-right">
                Remark
              </Label>
              <Textarea
                id="remark"
                value={remark}
                onChange={(e) => setRemark(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setConfirmationDialog({ open: false, action: "" })}
            >
              Cancel
            </Button>
            <Button onClick={() => handleUpdate(confirmationDialog.action)}>
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
