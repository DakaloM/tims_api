import { number, object, string } from "zod";

export const otpSchema = object({
    body: object({
        otp: number({
            required_error: "Required value otp is not provided",
            invalid_type_error: "invalid Otp value provided",
        }),
        userId: string({
            required_error: "Requyired Value UserId is not provided",
            invalid_type_error: "Invalid userId value provided"
        }),
        
    })
})