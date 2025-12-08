"use client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";
import { initPaymentAction } from "@/services/payment/InitialPayment";

export default function PayNowButton({ bookingId }: { bookingId: string }) {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    const result = await initPaymentAction(bookingId);

    if (result.success) {
      toast.success("Booking request successfully!");
    } else {
      toast.error(result.message || "Payment failed");
    }
    setLoading(false);
  };

  return (
    <Button onClick={handlePayment} disabled={loading}>
      {loading ? "Processing..." : "Pay Now"}
    </Button>
  );
}
