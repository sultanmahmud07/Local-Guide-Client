"use server"
/* eslint-disable @typescript-eslint/no-explicit-any */
import { serverFetch } from "@/lib/server-fetch";

export async function getGuideListing(queryString?: string) {
    try {
        const response = await serverFetch.get(`/listing/guide/all${queryString ? `?${queryString}` : ""}`);
        const result = await response.json();
        return {
            success: result.success,
            data: Array.isArray(result.data) ? result.data : [],
            meta: result.meta,
        };
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            data: [],
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}

export async function getTourBySlug(slug: string) {
    try {
        const response = await serverFetch.get(`/listing/${slug}`);
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
export async function createListing(formData: FormData) {
    try {
        const response = await serverFetch.post("/listing/create", {
            body: formData,
        });
        const result = await response.json();
        return result;
    } catch (error: any) {
        console.error("createListing error:", error);
        return {
            success: false,
            message:
                process.env.NODE_ENV === "development"
                    ? error?.message
                    : "Something went wrong",
        };
    }
}

export async function updateListing(formData: FormData, id: string) {
    try {
        const response = await serverFetch.patch(`/listing/update/${id}`, {
            body: formData,
        });
        const result = await response.json();
        console.log(result)
        return result;
    } catch (error: any) {
        console.error("Update Listing error:", error);
        return {
            success: false,
            message:
                process.env.NODE_ENV === "development"
                    ? error?.message
                    : "Something went wrong",
        };
    }
}

export async function deleteTour(tourId: string) {
    try {
        const response = await serverFetch.delete(`/listing/${tourId}`);
        const result = await response.json();

        return {
            success: result.success,
            message: result.message || "Tour removed successfully",
        };
    } catch (error: any) {
        console.error("Delete tour error:", error);
        return {
            success: false,
            message: error.message || "Failed to remove tour",
        };
    }
}