"use client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";
import { initPaymentAction } from "@/services/payment/InitialPayment";

export default function PayNowButton({ bookingId }: { bookingId: string }) {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const result = await initPaymentAction(bookingId);

      if (result.success && result.data.paymentUrl) {
        toast.success("Redirecting to payment gateway...");
        
        // 1. Redirect current window to the payment URL
        window.location.href = result.data.paymentUrl;
        
        // OR 2. If you strictly want a NEW window (might be blocked by popup blockers):
        // window.open(result.data.paymentUrl, "_blank");
        
      } else {
        toast.error(result.message || "Payment initiation failed");
        setLoading(false); // Only stop loading if failed, otherwise we are navigating away
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <Button 
        onClick={handlePayment} 
        disabled={loading}
        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-all"
    >
      {loading ? "Processing..." : "Pay Now"}
    </Button>
  );
}