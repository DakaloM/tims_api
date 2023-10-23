import {coerce, number, object, string, date } from "zod";

export const feeSchema = object({
    body: object({
        
        email: string({
            required_error: "email is required",
            invalid_type_error: "Invalid email provided"
        }),
        SAID: number({
            required_error: "SAID is required",
            invalid_type_error: "Invalid SAID provided"
        }),
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
        dateOfBirth: coerce.date({
            required_error: "Date of birth is required",
            invalid_type_error: "invalid Date of birth",
        }).min(new Date("1930-01-01"), {message: "Age too old"})
        .max(new Date(), {message: "Too young"}),
        gender: string({
            required_error: "Gender is required",
            invalid_type_error: "Enter a valid gender",
        }),
        address: string({
            required_error: "address is required",
            invalid_type_error: "Enter a valid address",
        }),
        resume: string({
            required_error: "Resume url is required",
            invalid_type_error: "Enter a valid resume url",
         }).url({message: "invalid resume Url"}),
        image: string({
            invalid_type_error: "Enter a valid image url",
         }).url({message: "invalid image Url"}).optional(),
        postId: string({
            required_error: "postId is required",
            invalid_type_error: "Invalid postId provided"
        }),
        positionId: string({
            required_error: "positionId is required",
            invalid_type_error: "Invalid positionId provided"
        }),
        status: string({
            invalid_type_error: "Invalid status provided"
        }).optional(),
        updatedBy: string({
            invalid_type_error: "Updated-by, not a valid field"
        }).optional(),
       
    })
})