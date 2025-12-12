"use server"
/* eslint-disable @typescript-eslint/no-explicit-any */

import { serverFetch } from "@/lib/server-fetch";
import {  ReviewPayload } from "@/types/review.interface";

export async function getReviews(queryString?: string) {
    try {
        const url = queryString ? `/review?${queryString}` : "/review";

        const response = await serverFetch.get(url);
        const result = await response.json();

        return {
            success: true,
            data: result.data,
            meta: result.meta,
        };
    } catch (error: any) {
        console.error("Get reviews error:", error);
        return {
            success: false,
            message: error.message || "Failed to fetch reviews",
            data: null,
        };
    }
}

export async function getReviewByGuid(id: string) {
    try {
        const response = await serverFetch.get(`/review/guide/${id}`);
        const result = await response.json();
        return result.data;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            data: [],
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}
export async function getReviewByTourist(id: string) {
    try {
        const response = await serverFetch.get(`/review/tourist/${id}`);
        const result = await response.json();
        return result.data;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            data: [],
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}
export async function getReviewByTourId(id: string) {
    try {
        const response = await serverFetch.get(`/review/tour/${id}`);
        const result = await response.json();
        return result.data;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            data: [],
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}
export async function createReview(data: ReviewPayload) {
    try {
        const response = await serverFetch.post("/review/create", {
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const result = await response.json();
        return result;
    } catch (error: any) {
        console.error("Error creating review:", error);
        return {
            success: false,
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Failed to create review",
        };
    }
}