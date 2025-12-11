/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { registerUserValidationZodSchema } from "@/zod/auth.validation";
import { loginUser } from "./loginUser";


export const registerUser = async (_currentState: any, formData: any): Promise<any> => {
    try {
        const payload = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            address: formData.get('address'),
            password: formData.get('password'),
            confirmPassword: formData.get('confirmPassword'),
            role: formData.get('role'),
        }

        if (zodValidator(payload, registerUserValidationZodSchema).success === false) {
            return zodValidator(payload, registerUserValidationZodSchema);
        }

        const validatedPayload: any = zodValidator(payload, registerUserValidationZodSchema).data;
        const registerData = {
            name: validatedPayload.name,
            email: validatedPayload.email,
            password: validatedPayload.password,
            phone: validatedPayload.phone,
            address: validatedPayload.address,
            role: validatedPayload.role,
        }
        
        const res = await serverFetch.post("/user/register", {
             body: JSON.stringify(registerData),
            headers: {
                "Content-Type": "application/json",
            }
        })

        const result = await res.json();


        if (result.success) {
            await loginUser(_currentState, formData);
        }

        return result;



    } catch (error: any) {
        if (error?.digest?.startsWith('NEXT_REDIRECT')) {
            throw error;
        }
        console.log(error);
        return { success: false, message: `${process.env.NODE_ENV === 'development' ? error.message : "Registration Failed. Please try again."}` };
    }
}

export const createAdmin = async (payload: any) => {
    try {
        const res = await serverFetch.post("/user/register", {
             body: JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json",
            }
        })
        const result = await res.json();

        return result;
    } catch (error: any) {
        if (error?.digest?.startsWith('NEXT_REDIRECT')) {
            throw error;
        }
        console.log(error);
        return { success: false, message: `${process.env.NODE_ENV === 'development' ? error.message : "Registration Failed. Please try again."}` };
    }
}