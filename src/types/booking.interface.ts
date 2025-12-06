
export enum PAYMENT_STATUS {
    PAID = "PAID",
    UNPAID = "UNPAID",
    CANCELLED = "CANCELLED",
    FAILED = "FAILED",
    REFUNDED = "REFUNDED"
}

export interface IPayment {
    booking: string;
    transactionId: string;
    amount: number;
    paymentGatewayData?: any
    invoiceUrl?: string
    status: PAYMENT_STATUS
}
export enum BOOKING_STATUS {
    PENDING = "PENDING",
    CONFIRMED = "CONFIRMED",
    DECLINED = "DECLINED",
    CANCELLED = "CANCELLED",
    COMPLETED = "COMPLETED"
}


export interface IBooking {
    _id: string;
    tour: string;
    user: string;
    guide: string;
    date: string; // YYYY-MM-DD
    time: string; // HH:mm
    groupSize: number;
    totalPrice: number;
    payment: string,
    paymentStatus: PAYMENT_STATUS;
    status: BOOKING_STATUS;

    notes?: string;
    statusLogs: {
        status: BOOKING_STATUS;
        updatedBy: string;
        timestamp: string;
    }[];
    createdAt: string;
    updatedAt?: string;
}

export interface IBookingFormData {
    doctorId: string;
    scheduleId: string;
}