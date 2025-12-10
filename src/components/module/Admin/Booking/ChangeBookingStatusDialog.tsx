"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { BOOKING_STATUS, IBooking } from "@/types/booking.interface";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { changeBookingStatus } from "@/services/booking/myBooking.service";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface Props {
  booking: IBooking;
  isOpen: boolean;
  onClose: () => void;
}

// NOTE: We keep the options array but handle the disabled state in rendering
const OPTIONS = [
  { value: BOOKING_STATUS.PENDING, label: "PENDING", description: "The initial state before review." },
  { value: BOOKING_STATUS.CONFIRMED, label: "CONFIRMED", description: "Booking accepted by the guide." },
  { value: BOOKING_STATUS.DECLINED, label: "DECLINED", description: "Booking rejected by the guide." },
  { value: BOOKING_STATUS.CANCELLED, label: "CANCELLED", description: "Booking canceled by the user/system." },
  { value: BOOKING_STATUS.COMPLETED, label: "COMPLETED", description: "Tour is finished." },
];


export default function ChangeBookingStatusDialog({ booking, isOpen, onClose }: Props) {
  const [newStatus, setNewStatus] = useState<BOOKING_STATUS>(booking.status);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    // Logic remains unchanged
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
          <DialogTitle className="text-2xl font-bold">Change Booking Status</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          
          {/* Booking Summary */}
          <div>
            <Label className="text-sm text-gray-500">Current Booking:</Label>
            <div className="font-semibold text-lg text-gray-800 mt-1">{booking.tour?.title}</div>
            <div className="text-sm text-muted-foreground">Booked by: {booking.user?.name}</div>
          </div>
          <Separator />

          {/* New Status Selection (Radio Buttons) */}
          <div className="space-y-3">
            <Label htmlFor="status" className="text-base font-semibold">Select New Status</Label>
            
            {/* 🎯 RadioGroup Implementation */}
            <RadioGroup 
                value={newStatus} 
                onValueChange={(v) => setNewStatus(v as BOOKING_STATUS)} 
                disabled={isSubmitting}
                className="space-y-2"
            >
              {OPTIONS.map((o) => {
                const isPending = o.value === BOOKING_STATUS.PENDING;
                const isDisabled = isPending || isSubmitting;
                
                // Determine if this status is the current one for visual feedback
                const isCurrent = o.value === booking.status;

                return (
                  <div 
                    key={o.value} 
                    className={`flex items-center space-x-3 p-3 border rounded-lg transition-all 
                                ${isDisabled ? 'bg-gray-50 text-gray-400 cursor-not-allowed' : 'hover:bg-green-50/50 cursor-pointer'}
                                ${isCurrent ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}
                    // Use a Label wrapped around the content for better click area
                  >
                    <RadioGroupItem 
                        value={o.value} 
                        id={`status-${o.value}`} 
                        disabled={isDisabled}
                        // Use the default color for Radio, but apply special border if current
                        className={isCurrent ? 'border-green-600 text-green-600' : ''}
                    />
                    <Label 
                        htmlFor={`status-${o.value}`} 
                        className={`flex flex-col flex-1 cursor-pointer ${isDisabled ? 'cursor-not-allowed' : ''}`}
                    >
                        <span className={`font-medium ${isCurrent ? 'text-green-700' : 'text-gray-900'}`}>
                            {o.label} {isCurrent && "(Current)"}
                        </span>
                        <span className="text-xs text-muted-foreground">
                            {isPending ? "Initial status (Cannot be set manually)" : o.description}
                        </span>
                    </Label>
                  </div>
                );
              })}
            </RadioGroup>
          </div>
        </div>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting || newStatus === booking.status} className="bg-green-600 hover:bg-green-700">
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              "Confirm Status Change"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}