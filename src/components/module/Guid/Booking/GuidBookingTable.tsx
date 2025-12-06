"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import ManagementTable from "@/components/shared/ManagementTable";
import { guideBookingColumns } from "./GuideBookingColumns";
import { BOOKING_STATUS, IBooking } from "@/types/booking.interface";
import GuideBookingDetailDialog from "./GuideBookingDetailDialog";
import ChangeBookingStatusDialog from "./ChangeBookingStatusDialog";

interface GuideBookingTableProps {
  bookings: IBooking[];
}

export default function GuideBookingTable({ bookings = [] }: GuideBookingTableProps) {
  const router = useRouter();
  const [viewingBooking, setViewingBooking] = useState<IBooking | null>(null);
  const [changingStatusBooking, setChangingStatusBooking] = useState<IBooking | null>(null);

  const handleView = (booking: IBooking) => setViewingBooking(booking);
  const handleStatusChange = (booking: IBooking) => setChangingStatusBooking(booking);

  const handleEditClick = (booking: IBooking) => {
    // Example business rules:
    if (booking.status === BOOKING_STATUS.CANCELLED) {
      toast.error("Cannot change status for cancelled bookings", {
        description: "Cancelled bookings are final and cannot be modified.",
      });
      return;
    }

    // Prevent changing after completed (if notes exist)
    if (booking.status === BOOKING_STATUS.COMPLETED && !!booking.notes) {
      toast.error("Cannot change status once notes are present", {
        description: "Booking status is locked after completion with notes.",
      });
      return;
    }

    handleStatusChange(booking);
  };

  return (
    <>
      <ManagementTable
        data={bookings}
        columns={guideBookingColumns}
        onView={handleView}
        onEdit={handleEditClick}
        getRowKey={(booking) => booking._id}
        emptyMessage="No bookings found"
      />

      {viewingBooking && (
        <GuideBookingDetailDialog
          booking={viewingBooking}
          open={!!viewingBooking}
          onClose={() => {
            setViewingBooking(null);
            router.refresh();
          }}
        />
      )}

      {changingStatusBooking && (
        <ChangeBookingStatusDialog
          booking={changingStatusBooking}
          isOpen={!!changingStatusBooking}
          onClose={() => {
            setChangingStatusBooking(null);
            router.refresh();
          }}
        />
      )}
    </>
  );
}
