/* eslint-disable @typescript-eslint/no-explicit-any */
import { serverFetch } from "@/lib/server-fetch";

export async function initPaymentAction(bookingId: string) {
      try {
            const response = await serverFetch.post(`/payment/init-payment/${bookingId}`, {
                  body: null
            });

            const result = await response.json();

            const paymentUrl = result?.data?.paymentUrl;
            // Open payment gateway in new tab immediately
            window.open(paymentUrl, "_blank", "noopener,noreferrer");

            return result;
      } catch (error: any) {
            console.error("Error creating booking:", error);
            return {
                  success: false,
                  message:
                        process.env.NODE_ENV === "development"
                              ? error.message
                              : "Failed to book booking",
            };
      }
}