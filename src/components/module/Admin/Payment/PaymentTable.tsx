"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import ManagementTable from "@/components/shared/ManagementTable";
import { IPayment } from "@/types/payment.interface";
import { paymentColumns } from "./paymentColumns";
import PaymentDetailDialog from "./PaymentDetailDialog";
import ChangePaymentStatusDialog from "./ChangePaymentStatusDialog";

interface PaymentTableProps {
  payments: IPayment[];
}

export default function PaymentTable({ payments = [] }: PaymentTableProps) {
  const router = useRouter();
  const [viewingPayment, setViewingPayment] = useState<IPayment | null>(null);
  const [changingStatusPayment, setChangingStatusPayment] = useState<IPayment | null>(null);

  const handleView = (payment: IPayment) => setViewingPayment(payment);
  const handleEditClick = (payment: IPayment) => setChangingStatusPayment(payment);

  return (
    <>
      <ManagementTable
        data={payments}
        columns={paymentColumns}
        onView={handleView}
        onEdit={handleEditClick}
        getRowKey={(p) => p._id}
        emptyMessage="No payment records found"
      />

      {viewingPayment && (
        <PaymentDetailDialog
          payment={viewingPayment}
          open={!!viewingPayment}
          onClose={() => {
            setViewingPayment(null);
            router.refresh(); // optional, if viewing triggers read updates
          }}
        />
      )}

      {changingStatusPayment && (
        <ChangePaymentStatusDialog
          payment={changingStatusPayment}
          isOpen={!!changingStatusPayment}
          onClose={() => {
            setChangingStatusPayment(null);
            router.refresh();
          }}
        />
      )}
    </>
  );
}