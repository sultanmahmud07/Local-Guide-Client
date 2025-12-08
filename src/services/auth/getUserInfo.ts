/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch";
import { UserInfo } from "@/types/user.interface";
import { revalidateTag } from "next/cache";

export const getUserInfo = async (): Promise<UserInfo | any> => {
    let userInfo: UserInfo | any;
    try {

        const response = await serverFetch.get("/auth/me", {
            cache: "force-cache",
            next: { tags: ["user-info"] }
        })

        const result = await response.json();

        userInfo = {
            ...result.data
        };



        return userInfo;
    } catch (error: any) {
        console.log(error);
        return {
            id: "",
            name: "Unknown User",
            email: "",
            role: "TOURIST",
        };
    }

}

export const updateProfile = async (formData: FormData) => {
    try {
        // IMPORTANT: Do NOT set Content-Type: application/json or JSON.stringify(data)
        // Pass the FormData object directly.
        const response = await serverFetch.patch("/user/profile", {
            // Use the FormData object directly as the body
            body: formData, 
        });

        revalidateTag("user-info", { expire: 0 });
        const result = await response.json();
        return result;
    } catch (error: any) {
        console.error("Error update profile:", error);
        return {
            success: false,
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Failed to profile update",
        };
    }
}