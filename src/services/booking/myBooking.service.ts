"use server"
/* eslint-disable @typescript-eslint/no-explicit-any */
import { serverFetch } from "@/lib/server-fetch";
import { IBookingFormData } from "@/types/booking.interface";

export async function createBooking(data: IBookingFormData) {
    try {
        const response = await serverFetch.post("/booking", {
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const result = await response.json();
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
export async function bookingRequest(data: any) {
    console.log(data)
    try {
        const response = await serverFetch.post(`/message/request`, {
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const result = await response.json();
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

export async function getMyBookings(queryString?: string) {
    try {
        const response = await serverFetch.get(
            `/booking${queryString ? `?${queryString}` : "?sort=-createdAt"}`
        );
        const result = await response.json();
        console.log({ result });
        return result;
    } catch (error: any) {
        console.error("Error fetching bookings:", error);
        return {
            success: false,
            data: [],
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Failed to fetch bookings",
        };
    }
}

export async function getBookingById(bookingId: string) {
    try {
        const response = await serverFetch.get(`/booking/${bookingId}`);
        const result = await response.json();
        return result.data;

    } catch (error: any) {
        console.error("Error fetching booking by id:", error);
        return {
            success: false,
            data: null,
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Failed to fetch booking by id",
        };
    }
}
export async function getReservedData(authorId: string) {
    try {
        const response = await serverFetch.get(`/booking/reserved/${authorId}`);
        const result = await response.json();
        return result.data;

    } catch (error: any) {
        console.error("Error fetching reserve data by id:", error);
        return {
            success: false,
            data: null,
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Failed to fetch booking by id",
        };
    }
}

export async function changeBookingStatus(
    bookingId: string,
    status: string
) {
    try {
        const response = await serverFetch.patch(
            `/booking/status/${bookingId}`,
            {
                body: JSON.stringify({ status }),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        const result = await response.json();
        return result;
    } catch (error: any) {
        console.error("Error changing appointment status:", error);
        return {
            success: false,
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Failed to change appointment status",
        };
    }
}
