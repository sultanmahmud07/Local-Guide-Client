
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

// ------------------
// TOUR INTERFACE
// ------------------
export interface ITour {
  _id: string;
  title: string;
  slug: string;
  description: string;
  thumbnail?: string;
  images: string[];
  fee: number;
  durationHours: number;
  meetingPoint: string;
  maxGroupSize: number;
  startTime: string[];
  itinerary: string[];
  importantPoints: string[];
  cancellationPolicy: string[];
  inclusionsAndExclusions?: {
    inclusions: string[];
    exclusions: string[];
  };
  author: string;
  language: string;
  category: string;
  destinationCity: string;
  isActive: boolean;
  status: string;
  createdAt: string;
  updatedAt: string;
}
export interface ITourGet {
  _id: string;
  title: string;
  slug: string;
  description: string;
  thumbnail?: string;
  transportation?: string;
  images: string[];
  fee: number;
  durationHours: number;
  meetingPoint: string;
  maxGroupSize: number;
  startTime: string[];
  itinerary: string[];
  importantPoints: string[];
  cancellationPolicy: string[];
  inclusionsAndExclusions?: {
    inclusions: string[];
    exclusions: string[];
  };
  author?: {
    _id: string;
    name: string;
    email?: string;
    avg_rating?: string;
    review_count?: string;
    picture?: string;
    bio?: string;
  };
  language: string;
  category: string;
  destinationCity: string;
  isActive: boolean;
  status: string;
  createdAt: string;
  updatedAt: string;
}
// ------------------
// USER / GUIDE INTERFACE
// ------------------
export interface IUserInfo {
  _id: string;
  name: string;
  email: string;
  role: "TOURIST" | "GUIDE" | "ADMIN" | "SUPER_ADMIN";
  isActive: string;
  isDeleted: boolean;
  isVerified: boolean;
  auths: {
    provider: string;
    providerId: string;
  }[];
  createdAt: string;
  updatedAt: string;
  address?: string;
  phone?: string;
}

// ------------------
// PAYMENT INTERFACE
// ------------------
export interface IPayment {
  _id: string;
  booking: string;
  transactionId: string;
  status: PAYMENT_STATUS;
  amount: number;
  invoiceUrl?: string;
  createdAt: string;
  updatedAt: string;
}

// ------------------
// STATUS LOG
// ------------------
export interface IBookingStatusLog {
  _id: string;
  status: BOOKING_STATUS;
  updatedBy: string;
  timestamp: string;
}

// ------------------
// MAIN BOOKING INTERFACE
// ------------------
interface IReview {
  rating: number;
  comment: string;
  user: {
    name: string;
    email: string;
    // Assume you have an image URL for the user profile, or use a default
    profileImage?: string; 
  };
  createdAt: string; // The date the review was created
}
export interface IBooking {
  _id: string;

  tour: ITour;
  user: IUserInfo;
  guide: IUserInfo;

  date: string;   // YYYY-MM-DD
  phone: string;   // YYYY-MM-DD
  address: string;   // YYYY-MM-DD
  review?: IReview;
  paymentUrl?: string;   
  time: string;   // HH:mm
  groupSize: number;
  totalPrice: number;

  notes?: string;

  paymentStatus: PAYMENT_STATUS;
  status: BOOKING_STATUS;

  statusLogs: IBookingStatusLog[];

  createdAt: string;
  updatedAt: string;

  payment?: IPayment;
}

export interface IBookingFormData {
  tour: string;       // tourId
  guide: string;      // guideId
  date: string;       // YYYY-MM-DD
  time: string;       // HH:mm
  groupSize: number;      // optional notes
  meetingPlace?: string;     // optional notes
  phone?: string;     // optional notes
  notes?: string;     // optional notes
}
