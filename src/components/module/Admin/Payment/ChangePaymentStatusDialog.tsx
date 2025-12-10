"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { IPayment, PaymentStatus } from "@/types/payment.interface"; // Use the correct type
import { useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { changePaymentStatus } from "@/services/payment/InitialPayment";

interface Props {
  payment: IPayment;
  isOpen: boolean;
  onClose: () => void;
}

const STATUS_OPTIONS: { value: PaymentStatus; label: string; description: string }[] = [
  { value: "UNPAID", label: "UNPAID", description: "Transaction initiated but not completed." },
  { value: "PAID", label: "PAID", description: "Payment successfully received." },
  { value: "FAILED", label: "FAILED", description: "Transaction failed or was cancelled." },
];

export default function ChangePaymentStatusDialog({ payment, isOpen, onClose }: Props) {
  const [newStatus, setNewStatus] = useState<PaymentStatus>(payment.status);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (newStatus === payment.status) {
      toast.info("No changes made");
      onClose();
      return;
    }

    setIsSubmitting(true);
    try {
      // Call your specific payment update API
      const res = await changePaymentStatus(payment._id, newStatus);
      
      if (res?.success) {
        toast.success("Payment status updated");
        onClose();
      } else {
        toast.error(res?.message || "Failed to update status");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Update Payment Status</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          
          {/* Summary */}
          <div>
            <Label className="text-xs text-muted-foreground uppercase tracking-wide">Transaction</Label>
            <div className="font-mono text-sm bg-gray-50 p-2 rounded mt-1 border">
                {payment.transactionId}
            </div>
            <div className="flex justify-between items-center mt-2">
                <span className="text-sm text-gray-600">Amount:</span>
                <span className="font-bold text-lg">${payment.amount}</span>
            </div>
          </div>
          
          <Separator />

          {/* Status Selection */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Select New Status</Label>
            
            <RadioGroup 
                value={newStatus} 
                onValueChange={(v) => setNewStatus(v as PaymentStatus)} 
                disabled={isSubmitting}
                className="space-y-2"
            >
              {STATUS_OPTIONS.map((o) => {
                const isCurrent = o.value === payment.status;

                return (
                  <div 
                    key={o.value} 
                    className={`flex items-start space-x-3 p-3 border rounded-lg transition-all 
                                ${isSubmitting ? 'opacity-50' : 'hover:bg-gray-50 cursor-pointer'}
                                ${isCurrent ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-200' : 'border-gray-200'}`}
                  >
                    <RadioGroupItem 
                        value={o.value} 
                        id={`status-${o.value}`} 
                        className="mt-1"
                    />
                    <Label 
                        htmlFor={`status-${o.value}`} 
                        className="flex flex-col flex-1 cursor-pointer"
                    >
                        <span className={`font-medium ${isCurrent ? 'text-blue-700' : 'text-gray-900'}`}>
                            {o.label}
                        </span>
                        <span className="text-xs text-muted-foreground">
                            {o.description}
                        </span>
                    </Label>
                  </div>
                );
              })}
            </RadioGroup>
          </div>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting || newStatus === payment.status}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              "Confirm Update"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}