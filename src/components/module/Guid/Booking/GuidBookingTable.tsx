"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import {
  AppointmentStatus,
  IAppointment,
} from "@/types/appointments.interface";
import ManagementTable from "@/components/shared/ManagementTable";
import { guideBookingColumns } from "./GuideBookingColumns";
import GuideBookingDetailDialog from "./GuideBookingDetailDialog";
import ChangeBookingStatusDialog from "./ChangeBookingStatusDialog";

interface GuideBookingTableProps {
  appointments: IAppointment[];
}

export default function GuideBookingTable({
  appointments = [],
}: GuideBookingTableProps) {
  const router = useRouter();
  const [viewingAppointment, setViewingAppointment] =
    useState<IAppointment | null>(null);
  const [changingStatusAppointment, setChangingStatusAppointment] =
    useState<IAppointment | null>(null);

  const handleView = (appointment: IAppointment) => {
    setViewingAppointment(appointment);
  };

  const handleStatusChange = (appointment: IAppointment) => {
    setChangingStatusAppointment(appointment);
  };

  // Custom wrapper to conditionally show edit action
  const handleEditClick = (appointment: IAppointment) => {
    // Cannot change status for:
    // 1. Canceled appointments
    // 2. Completed appointments with prescriptions
    if (appointment.status === AppointmentStatus.CANCELED) {
      toast.error("Cannot change status for canceled appointments", {
        description: "Canceled appointments are final and cannot be modified.",
      });
      return;
    }

    if (
      appointment.status === AppointmentStatus.COMPLETED &&
      !!appointment.prescription
    ) {
      toast.error("Cannot change status once prescription is provided", {
        description:
          "Appointment status is locked after prescription is created to maintain medical record integrity.",
      });
      return;
    }

    handleStatusChange(appointment);
  };

  return (
    <>
      <ManagementTable
        data={appointments}
        columns={guideBookingColumns}
        onView={handleView}
        onEdit={handleEditClick}
        getRowKey={(appointment) => appointment.id}
        emptyMessage="No appointments found"
      />

      {/* View Detail Dialog */}
      {viewingAppointment && (
        <GuideBookingDetailDialog
          appointment={viewingAppointment}
          open={!!viewingAppointment}
          onClose={() => {
            setViewingAppointment(null);
            router.refresh();
          }}
        />
      )}

      {/* Change Status Dialog */}
      {changingStatusAppointment && (
        <ChangeBookingStatusDialog
          appointment={changingStatusAppointment}
          isOpen={!!changingStatusAppointment}
          onClose={() => {
            setChangingStatusAppointment(null);
            router.refresh();
          }}
        />
      )}
    </>
  );
}
