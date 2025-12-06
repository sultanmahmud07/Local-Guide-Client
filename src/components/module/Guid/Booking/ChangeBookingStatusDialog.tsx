"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { BOOKING_STATUS, IBooking } from "@/types/booking.interface";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { changeBookingStatus } from "@/services/booking/myBooking.service";

interface Props {
  booking: IBooking;
  isOpen: boolean;
  onClose: () => void;
}

const OPTIONS = [
  { value: BOOKING_STATUS.CONFIRMED, label: "Confirm" },
  { value: BOOKING_STATUS.DECLINED, label: "Decline" },
  { value: BOOKING_STATUS.CANCELLED, label: "Cancel" },
  { value: BOOKING_STATUS.COMPLETED, label: "Mark Completed" },
];

export default function ChangeBookingStatusDialog({ booking, isOpen, onClose }: Props) {
  const [newStatus, setNewStatus] = useState<BOOKING_STATUS>(booking.status);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (newStatus === booking.status) {
      toast.info("No changes made");
      onClose();
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await changeBookingStatus(booking._id, newStatus);
      if (res?.success) {
        toast.success("Booking status updated");
        onClose();
      } else {
        toast.error(res?.message || "Failed to update status");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Change Booking Status</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div>
            <Label>Booking</Label>
            <div className="font-medium">{booking.tour?.title}</div>
            <div className="text-sm text-muted-foreground">{booking.user?.name}</div>
          </div>

          <div>
            <Label htmlFor="status">New status</Label>
            <Select value={newStatus} onValueChange={(v) => setNewStatus(v as BOOKING_STATUS)} disabled={isSubmitting}>
              <SelectTrigger id="status" className="w-full">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {OPTIONS.map((o) => (
                  <SelectItem key={o.value} value={o.value}>
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              "Confirm"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
