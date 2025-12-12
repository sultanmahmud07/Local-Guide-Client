"use server"
/* eslint-disable @typescript-eslint/no-explicit-any */
import { serverFetch } from "@/lib/server-fetch";

// The IQueryProps interface remains the same
export interface IQueryProps {
      search?: string;
      priceRange?: string;
      category?: string;
      type?: string;
      language?: string;
}

/**
 * Helper function to convert a partial IQueryProps object into a URL-encoded query string,
 * including only fields with non-empty string values.
 */
function buildQueryString(params: Partial<IQueryProps> | undefined): string {
      if (!params) return "";

      const urlParams = new URLSearchParams();

      for (const key in params) {
            // Ensure the value is a non-empty string before appending
            const value = params[key as keyof IQueryProps];
            if (value && typeof value === 'string' && value.trim() !== '') {
                  // Append the key and value to URLSearchParams
                  urlParams.append(key, value);
            }
      }

      const queryString = urlParams.toString();
      return queryString ? `?${queryString}` : "";
}


export async function getAllGuides(queryString?: IQueryProps) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const query = buildQueryString(queryString); // Build the query string from the input object
      try {
            const response = await serverFetch.get(`/user/guide/search`); // Append the query string
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

export async function getAllTours(queryString?: IQueryProps) {
      const query = buildQueryString(queryString); // Build the query string from the input object
      try {
            const response = await serverFetch.get(`/listing/search${query}`); // Append the query string
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