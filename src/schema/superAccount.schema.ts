import { bigint, coerce, date, number, object, string } from "zod";

//@ts-ignore
export const supperAccountSchema = object({
    body: object({
 
        email: string({
            required_error: "Email is required",
            invalid_type_error: "Email must be a string",
        }).email({message: "Invalid email address"}),
        phone: string({
            required_error: "Phone required",
            invalid_type_error: "invalid Phone number",
        }).startsWith("0", {message: "Phone must start with '0'"}),
        firstName: string({
            required_error: "First name required",
            invalid_type_error: "invalid Name ",
        }),
        lastName: string({
            required_error: "Last name required",
            invalid_type_error: "invalid Name ",
        }),
        password: string({
            required_error: "Password is required",
        }).min(6, {message: "Password must be at least 6 characters"}),
        confirmPassword: string({
            required_error: "Password confirmation required",
        }).min(6, {message: "Password must be at least 6 characters"}),

       
    }).refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"]
    })
    
})