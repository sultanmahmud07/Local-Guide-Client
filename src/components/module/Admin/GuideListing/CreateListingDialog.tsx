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
import {
  createDoctorSchedule,
} from "@/services/doctor/doctorScedule.services";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface BookScheduleDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}
export default function AddListingDialog({
  open,
  onClose,
  onSuccess,
}: BookScheduleDialogProps) {
  const [selectedSchedules, setSelectedSchedules] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();


  const handleSubmit = async () => {
    if (selectedSchedules.length === 0) {
      toast.error("Please select at least one schedule");
      return;
    }

    try {
      setIsLoading(true);
      await createDoctorSchedule(selectedSchedules);
      toast.success(
        `Successfully booked ${selectedSchedules.length} schedule${selectedSchedules.length > 1 ? "s" : ""
        }`
      );
      if (onSuccess) {
        onSuccess();
      } else {
        router.refresh();
      }
      onClose();
    } catch (error) {
      console.error("Error booking schedules:", error);
      toast.error("Failed to book schedules");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Book Schedules</DialogTitle>
          <DialogDescription>
            Select time slots from available schedules to add to your calendar
          </DialogDescription>
        </DialogHeader>

        <div className="ll">
          hello
        </div>

        <DialogFooter>
          <div className="flex items-center justify-between w-full">
            <p className="text-sm text-muted-foreground">
              {selectedSchedules.length} schedule
              {selectedSchedules.length !== 1 ? "s" : ""} selected
            </p>
            <div className="flex gap-2">
              <Button variant="outline" onClick={onClose} disabled={isLoading}>
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={selectedSchedules.length === 0 || isLoading}
              >
                {isLoading ? "Booking..." : "Book Schedules"}
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
