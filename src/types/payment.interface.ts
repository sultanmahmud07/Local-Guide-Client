// types/payment.interface.ts
export type PaymentStatus = "PAID" | "UNPAID" | "FAILED";

export interface IPayment {
  _id: string;
  transactionId: string;
  status: PaymentStatus;
  amount: number;
  invoiceUrl?: string;
  createdAt: string;
  updatedAt: string;
  booking: {
    _id: string;
    date: string;
    time: string;
    groupSize: number;
    phone: string;
    totalPrice: number;
    address: string;
    // Optional fields if your backend sometimes populates them, 
    // otherwise we rely on phone/address from your data
    user?: { name: string; email: string }; 
    tour?: { title: string; destinationCity: string }; 
  };
}