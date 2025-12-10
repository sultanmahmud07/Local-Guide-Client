import { Column } from "@/components/shared/ManagementTable";
import { Badge } from "@/components/ui/badge";
import { BOOKING_STATUS, IBooking, PAYMENT_STATUS } from "@/types/booking.interface";
import { format } from "date-fns";

export const guideBookingColumns: Column<IBooking>[] = [
  {
    header: "Traveler",
    accessor: (b) => (
      <div className="flex items-center gap-3">
        <div>
          <p className="font-medium">{b.user?.name || "N/A"}</p>
          <p className="text-xs text-muted-foreground">{b.user?.email || ""}</p>
        </div>
      </div>
    ),
  },
  {
    header: "Tour",
    accessor: (b) => (
      <div>
        <p className="font-medium">{b.tour?.title.slice(0, 30) || "N/A"}</p>
        <p className="text-xs text-muted-foreground">{b.tour?.destinationCity.slice(0, 30) || ""}</p>
      </div>
    ),
    sortKey: "tour.title",
  },
  {
    header: "Date & Time",
    accessor: (b) => (
      <div className="text-sm">
        <p className="font-medium">{b.date ? format(new Date(b.date), "MMM d, yyyy") : "N/A"}</p>
        <p className="text-muted-foreground">{b.time || "-"}</p>
      </div>
    ),
    sortKey: "date",
  },
  {
    header: "Group",
    accessor: (b) => <div>{b.groupSize ?? "-"}</div>,
    sortKey: "groupSize",
  },
  {
    header: "Price",
    accessor: (b) => <div>${b.totalPrice ?? 0}</div>,
    sortKey: "totalPrice",
  },
  {
    header: "Payment",
    accessor: (b) => {
      const paid = b.paymentStatus === PAYMENT_STATUS.PAID;
      return <Badge variant={paid ? "default" : "secondary"}>{paid ? "Paid" : "Unpaid"}</Badge>;
    },
  },
  {
    header: "Status",
    accessor: (b) => {
      const map: Record<BOOKING_STATUS, { label: string; cls?: string }> = {
        [BOOKING_STATUS.PENDING]: { label: "Pending", cls: "bg-yellow-50 text-yellow-800" },
        [BOOKING_STATUS.CONFIRMED]: { label: "Confirmed", cls: "bg-green-50 text-green-800" },
        [BOOKING_STATUS.DECLINED]: { label: "Declined", cls: "bg-red-50 text-red-800" },
        [BOOKING_STATUS.CANCELLED]: { label: "Cancelled", cls: "bg-gray-50 text-gray-700" },
        [BOOKING_STATUS.COMPLETED]: { label: "Completed", cls: "bg-blue-50 text-blue-800" },
      };
      const cfg = map[b.status as BOOKING_STATUS] || { label: b.status || "Unknown" };
      return <Badge variant="outline" className={cfg.cls}>{cfg.label}</Badge>;
    },
    sortKey: "status",
  },
];
