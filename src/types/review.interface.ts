import { IAppointment } from "./appointments.interface";
import { IDoctor } from "./doctor.interface";
import { IPatient } from "./patient.interface";
interface ITourBase {
    _id: string;
    title: string;
    slug: string;
}

interface IUserBase {
    _id: string;
    name: string;
    picture?: string;
}
export interface IReview {
    id: string;
    _id?: string;
    patientId: string;
    tour?: ITourBase;
    guide?: IUserBase;
    user?: IUserBase;
    patient?: IPatient;
    doctorId: string;
    doctor?: IDoctor;
    appointmentId: string;
    appointment?: IAppointment;
    rating: number;
    comment: string;
    createdAt: string;
    updatedAt: string;
}

export interface IReviewFormData {
    appointmentId: string;
    rating: number;
    comment: string;
}
export interface ReviewPayload {
  /** The unique identifier of the booking associated with the review. */
  booking: string;
  /** The unique identifier of the tour being reviewed. */
  tour: string;
  /** The rating given for the tour (e.g., a number from 1 to 5). */
  rating: number;
  /** The textual comment or feedback provided for the review. */
  comment: string;
}

// types/review.interface.ts (or use IReview if already defined)

export interface IReviewForGuide {
    _id: string;
    tour: {
        _id: string;
        title: string;
    };
    user: {
        _id: string;
        name: string;
        // Assuming picture/avatar is populated
        picture?: string; 
    };
    rating: number;
    comment: string;
    createdAt: string;
}

// Interface for the main component props
export interface GuideReviewsProps {
    // Aggregated stats from guideInfo
    guideInfo: {
        avg_rating: number;
        review_count: number;
    };
    reviews: IReview[];
}

// src/types/review.interface.ts

// --- Nested Interfaces ---

interface ITourReviewDetails {
    _id: string;
    title: string;
    slug: string;
    description?: string; // Included based on your data snippet
    images?: string[];
    fee?: number; // Included based on your data snippet
    // Add other fields like slug, duration, etc., if needed for display links
}

interface IUserProfileSnippet {
    _id: string;
    name: string;
    email?: string;
    picture?: string; // Profile picture URL
}

/**
 * Interface representing a Review document displayed on a TOURIST's profile.
 * It focuses on showing WHO received the review (Guide) and WHAT was reviewed (Tour).
 */
export interface IReviewForTourist {
    _id: string;
    
    // The tour that was reviewed (populated snippet)
    tour: ITourReviewDetails;
    
    // The guide who received the review (populated snippet)
    guide: IUserProfileSnippet;
    
    // The user (tourist) who wrote the review (This is the profile owner)
    user: IUserProfileSnippet; 
    
    booking?: string; // Optional booking ID
    rating: number; // 1-5 star rating
    comment: string;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    __v?: number;
}