"use client";

import { Column } from "@/components/shared/ManagementTable";
import { Badge } from "@/components/ui/badge";
import { IPayment, PaymentStatus } from "@/types/payment.interface";
import { format } from "date-fns";
import { FileText, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Link from "next/link";

export const paymentColumns: Column<IPayment>[] = [
  {
    header: "Transaction ID",
    accessor: (row) => (
      <div className="flex items-center gap-2">
        <span className="font-mono text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
          {row.transactionId.slice(0, 16)}...
        </span>
        <button 
            onClick={() => {
                navigator.clipboard.writeText(row.transactionId);
                toast.success("Copied Transaction ID");
            }}
            className="text-gray-400 hover:text-gray-600"
        >
            <Copy className="w-3 h-3" />
        </button>
      </div>
    ),
  },
  {
    header: "Booking Info",
    accessor: (row) => (
      <div className="text-sm">
        <p className="font-medium text-gray-900">
           {format(new Date(row.booking.date), "MMM d, yyyy")} <span className="text-gray-400">|</span> {row.booking.time}
        </p>
        <p className="text-xs text-muted-foreground">
            {row.booking.phone}
        </p>
      </div>
    ),
  },
  {
    header: "Amount",
    accessor: (row) => (
      <div className="font-medium text-gray-900">
        ${row.amount}
      </div>
    ),
    sortKey: "amount",
  },
  {
    header: "Status",
    accessor: (row) => {
      const statusColors: Record<PaymentStatus, string> = {
        PAID: "bg-green-100 text-green-800 border-green-200",
        UNPAID: "bg-yellow-100 text-yellow-800 border-yellow-200",
        FAILED: "bg-red-100 text-red-800 border-red-200",
      };
      
      return (
        <Badge variant="outline" className={`border ${statusColors[row.status] || "bg-gray-100"}`}>
          {row.status}
        </Badge>
      );
    },
    sortKey: "status",
  },
  {
    header: "Invoice",
    accessor: (row) => {
        if (!row.invoiceUrl) return <span className="text-xs text-gray-400">-</span>;
        return (
            <Link href={row.invoiceUrl} target="_blank">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600">
                    <FileText className="w-4 h-4" />
                </Button>
            </Link>
        );
    }
  }
];