/* eslint-disable @typescript-eslint/no-explicit-any */
import { serverFetch } from "@/lib/server-fetch";

export async function getAllListing(queryString?: string) {
    try {
        const response = await serverFetch.get(`/listing${queryString ? `?${queryString}` : ""}`);
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
