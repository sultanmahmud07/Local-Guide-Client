"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { IPayment } from "@/types/payment.interface";
import { format } from "date-fns";
import Link from "next/link";
import { Download, CreditCard, Calendar, MapPin, Users } from "lucide-react";

interface Props {
  payment: IPayment | null;
  open: boolean;
  onClose: () => void;
}

export default function PaymentDetailDialog({ payment, open, onClose }: Props) {
  if (!payment) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
             <CreditCard className="w-5 h-5 text-gray-500" />
             Payment Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          
          {/* Top Section: Transaction Summary */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 flex justify-between items-center">
            <div>
                <p className="text-sm text-muted-foreground">Total Amount</p>
                <p className="text-2xl font-bold text-gray-900">${payment.amount}</p>
            </div>
            <div className="text-right">
                 <Badge className={`text-sm px-3 py-1 ${
                     payment.status === 'PAID' ? 'bg-green-600' : 
                     payment.status === 'FAILED' ? 'bg-red-600' : 'bg-yellow-600'
                 }`}>
                    {payment.status}
                 </Badge>
                 <p className="text-xs text-muted-foreground mt-2 font-mono">
                    {payment.transactionId}
                 </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            
            {/* Booking Details */}
            <div className="space-y-3">
                <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" /> Booking Info
                </h4>
                <div className="text-sm space-y-2 border-l-2 border-gray-200 pl-3">
                    <div>
                        <span className="text-muted-foreground block text-xs">Date & Time</span>
                        <span className="font-medium">
                            {format(new Date(payment.booking.date), "PPP")} at {payment.booking.time}
                        </span>
                    </div>
                    <div>
                        <span className="text-muted-foreground block text-xs">Group Size</span>
                        <span className="font-medium flex items-center gap-1">
                            <Users className="w-3 h-3" /> {payment.booking.groupSize} People
                        </span>
                    </div>
                    <div>
                        <span className="text-muted-foreground block text-xs">Contact Phone</span>
                        <span className="font-medium">{payment.booking.phone}</span>
                    </div>
                </div>
            </div>

            {/* Location / Meta */}
            <div className="space-y-3">
                <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" /> Location
                </h4>
                <div className="text-sm space-y-2 border-l-2 border-gray-200 pl-3">
                     <div>
                        <span className="text-muted-foreground block text-xs">Address</span>
                        <span className="font-medium">{payment.booking.address}</span>
                    </div>
                    <div>
                        <span className="text-muted-foreground block text-xs">Created At</span>
                        <span className="font-medium">
                            {format(new Date(payment.createdAt), "PP p")}
                        </span>
                    </div>
                </div>
            </div>
          </div>
          
          {/* Invoice Section */}
          {payment.invoiceUrl && (
              <div className="border-t pt-4">
                  <Link href={payment.invoiceUrl} target="_blank">
                    <Button variant="outline" className="w-full gap-2 text-blue-600 border-blue-200 hover:bg-blue-50">
                        <Download className="w-4 h-4" /> Download Invoice PDF
                    </Button>
                  </Link>
              </div>
          )}

        </div>

        <div className="flex justify-end pt-2">
          <Button  onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}