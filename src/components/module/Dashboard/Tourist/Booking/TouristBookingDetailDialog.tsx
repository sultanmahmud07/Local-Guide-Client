"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BOOKING_STATUS, IBooking } from "@/types/booking.interface";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

interface Props {
  booking: IBooking | null;
  open: boolean;
  onClose: () => void;
}

export default function TouristBookingDetailDialog({ booking, open, onClose }: Props) {
  const router = useRouter();
  if (!booking) return null;
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="min-w-[680px] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Booking Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="grid grid-cols-2 gap-6">
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold">Traveller</h4>
              <p className="font-medium">{booking.user?.name}</p>
              <p className="text-sm text-muted-foreground">{booking.user?.email}</p>
              <p className="text-sm">{booking.user?.phone || "-"}</p>
            </div>

            <div className="border rounded-lg p-4">
              <h4 className="font-semibold">Tour</h4>
              <p className="font-medium">{booking.tour?.title}</p>
              <p className="text-sm text-muted-foreground">{booking.tour?.destinationCity}</p>
              <p className="text-sm">Fee: ${booking.tour?.fee}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="border rounded-lg p-4">
              <p className="text-muted-foreground">Date</p>
              <p className="font-medium">{format(new Date(booking.date), "PPP")}</p>
            </div>
            <div className="border rounded-lg p-4">
              <p className="text-muted-foreground">Time</p>
              <p className="font-medium">{booking.time}</p>
            </div>
            <div className="border rounded-lg p-4">
              <p className="text-muted-foreground">Group Size</p>
              <p className="font-medium">{booking.groupSize}</p>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <h4 className="font-semibold">Notes</h4>
            <p className="text-sm">{booking.notes || "-"}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="border rounded-lg p-4">
              <p className="text-muted-foreground">Payment Status</p>
              <Badge variant={booking.paymentStatus === "PAID" ? "default" : "destructive"}>
                {booking.paymentStatus}
              </Badge>
            </div>
            <div className="border rounded-lg p-4">
              <p className="text-muted-foreground">Booking Status</p>
              <Badge variant="outline">{booking.status}</Badge>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <h4 className="font-semibold">Status Logs</h4>
            <div className="space-y-2 mt-3">
              {booking.statusLogs?.length ? (
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                booking.statusLogs.map((s: any) => (
                  <div key={s._id || s.timestamp} className="text-sm">
                    <div className="flex justify-between">
                      <span>{s.status}</span>
                      <span className="text-muted-foreground">{format(new Date(s.timestamp), "PPP p")}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-sm text-muted-foreground">No logs</div>
              )}
            </div>
          </div>
          <div className="review-container">
            {
              booking.status === BOOKING_STATUS.COMPLETED && <Button>Give Review</Button>
            }

          </div>
        </div>

        <div className="flex justify-end gap-3 py-4 border-t">
          <Button variant="outline" onClick={() => { onClose(); router.refresh(); }}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
