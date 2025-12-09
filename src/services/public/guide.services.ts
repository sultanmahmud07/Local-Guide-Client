"use server"
/* eslint-disable @typescript-eslint/no-explicit-any */
import { serverFetch } from "@/lib/server-fetch";

export async function getGuideListing(queryString?: string) {
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
export async function getFeaturedGuide(queryString?: string) {
    try {
        const response = await serverFetch.get(`/user/guide/featured${queryString ? `?${queryString}` : ""}`);
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
export async function getFeaturedTourist(queryString?: string) {
    try {
        const response = await serverFetch.get(`/user/tourist/featured${queryString ? `?${queryString}` : ""}`);
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
export async function getGuidProfileWithTour(guideId: string) {
    try {
        const response = await serverFetch.get(`/user/guide/${guideId}`);
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
export async function getTouristById(id: string) {
    try {
        const response = await serverFetch.get(`/user/${id}`);
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

