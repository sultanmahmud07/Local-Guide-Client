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

export default function GuideBookingTable({
  bookings = [],
}: GuideBookingTableProps) {
  const router = useRouter();
  const [viewingBooking, setViewingBooking] =
    useState<IBooking | null>(null);
  const [changingStatusBooking, setChangingStatusBooking] =
    useState<IBooking | null>(null);

  const handleView = (booking: IBooking) => {
    setViewingBooking(booking);
  };

  const handleStatusChange = (booking: IBooking) => {
    setChangingStatusBooking(booking);
  };

  // Custom wrapper to conditionally show edit action
  const handleEditClick = (booking: IBooking) => {
    // Cannot change status for:
    // 1. Canceled bookings
    // 2. Completed bookings with prescriptions
    if (booking.status === BOOKING_STATUS.CANCELLED) {
      toast.error("Cannot change status for canceled bookings", {
        description: "Canceled bookings are final and cannot be modified.",
      });
      return;
    }

    if (
      booking.status === BOOKING_STATUS.COMPLETED &&
      !!booking.notes
    ) {
      toast.error("Cannot change status once prescription is provided", {
        description:
          "booking status is locked after prescription is created to maintain medical record integrity.",
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

      {/* View Detail Dialog */}
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

      {/* Change Status Dialog */}
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
