"use server"
/* eslint-disable @typescript-eslint/no-explicit-any */
import { serverFetch } from "@/lib/server-fetch";

export async function initPaymentAction(bookingId: string) {
    try {
        const response = await serverFetch.post(`/payment/init-payment/${bookingId}`, {
            body: null
        });

        const result = await response.json();

        // const paymentUrl = result?.data?.paymentUrl;
        // // Open payment gateway in new tab immediately
        // window.open(paymentUrl, "_blank", "noopener,noreferrer");

        return result;
    } catch (error: any) {
        console.error("Error creating booking:", error);
        return {
            success: false,
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Payment request failed!",
        };
    }
}


export async function getMyPayments(queryString?: string) {
    try {
        const response = await serverFetch.get(
            `/payment${queryString ? `?${queryString}` : "?sort=-createdAt"}`
        );
        const result = await response.json();
        console.log({ result });
        return result;
    } catch (error: any) {
        console.error("Error fetching Payment:", error);
        return {
            success: false,
            data: [],
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Failed to fetch Payment",
        };
    }
}

export async function getPaymentById(paymentId: string) {
    try {
        const response = await serverFetch.get(`/payment/${paymentId}`);
        const result = await response.json();
        return result.data;

    } catch (error: any) {
        console.error("Error fetching payment by id:", error);
        return {
            success: false,
            data: null,
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Failed to fetch payment by id",
        };
    }
}


export async function changePaymentStatus(
    paymentId: string,
    status: string
) {
    try {
        const response = await serverFetch.patch(
            `/payment/${paymentId}`,
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
        console.error("Error changing payment status:", error);
        return {
            success: false,
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Failed to change payment status",
        };
    }
}
