"use server"
/* eslint-disable @typescript-eslint/no-explicit-any */
import { serverFetch } from "@/lib/server-fetch";


export async function getTouristStaticData() {
    try {
        const response = await serverFetch.get(`/stats/tourist`);
        const result = await response.json();
        return result.data;

    } catch (error: any) {
        console.error("Error fetching tourist static by id:", error);
        return {
            success: false,
            data: null,
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Failed to fetch tourist static data by id",
        };
    }
}
export async function getGuideStaticData() {
    try {
        const response = await serverFetch.get(`/stats/guide`);
        const result = await response.json();
        return result.data;

    } catch (error: any) {
        console.error("Error fetching tourist static by id:", error);
        return {
            success: false,
            data: null,
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Failed to fetch tourist static data by id",
        };
    }
}
export async function getAdminStaticData() {
    try {
        const response = await serverFetch.get(`/stats/admin`);
        const result = await response.json();
        return result.data;

    } catch (error: any) {
        console.error("Error fetching tourist static by id:", error);
        return {
            success: false,
            data: null,
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Failed to fetch tourist static data by id",
        };
    }
}
