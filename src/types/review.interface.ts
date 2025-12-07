import { IAppointment } from "./appointments.interface";
import { IDoctor } from "./doctor.interface";
import { IPatient } from "./patient.interface";

export interface IReview {
    id: string;
    patientId: string;
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