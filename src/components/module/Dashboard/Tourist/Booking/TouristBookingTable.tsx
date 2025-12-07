"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ManagementTable from "@/components/shared/ManagementTable";
import {IBooking } from "@/types/booking.interface";
import { touristBookingColumns } from "./touristBookingColumns";
import TouristBookingDetailDialog from "./TouristBookingDetailDialog";

interface TouristBookingTableProps {
  bookings: IBooking[];
}

export default function TouristBookingTable({ bookings = [] }: TouristBookingTableProps) {
  const router = useRouter();
  const [viewingBooking, setViewingBooking] = useState<IBooking | null>(null);
 
  return (
    <>
      <ManagementTable
        data={bookings}
        columns={touristBookingColumns}
        onView={(booking) => router.push(`/dashboard/my-booking/${booking._id}`)}
        getRowKey={(booking) => booking._id}
        emptyMessage="No bookings found"
      />

      {viewingBooking && (
        <TouristBookingDetailDialog
          booking={viewingBooking}
          open={!!viewingBooking}
          onClose={() => {
            setViewingBooking(null);
            router.refresh();
          }}
        />
      )}
    </>
  );
}
