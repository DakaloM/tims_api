import { bigint, coerce, date, number, object, string } from "zod";

//@ts-ignore
export const createUserSchema = object({
    body: object({
        associationId: string({
            required_error: "AssociationId required",
            invalid_type_error: "Invalid associationId",
        }).cuid({message: "Invalid associationId"}),  
        email: string({
            required_error: "Email is required",
            invalid_type_error: "Email must be a string",
        }).email({message: "Invalid email address"}),
        SAID: number({
            required_error: "SAID is required",
            invalid_type_error: "Invalid SAID",
        },
        ),
        phone: string({
            required_error: "Phone required",
            invalid_type_error: "invalid Phone number",
        }).startsWith("0", {message: "Phone must start with '0'"}),
        firstName: string({
            required_error: "First name required",
            invalid_type_error: "invalid Name ",
        }).refine((value) => value.length > 2, {
            message: "firstName must be provided"
        }),
        lastName: string({
            required_error: "Last name required",
            invalid_type_error: "invalid Name ",
        }).refine((value) => value.length > 2, {
            message: "lastName must be provided"
        }),
        dateOfBirth: coerce.date({
            invalid_type_error: "invalid Date of birth",
        }).min(new Date("1930-01-01"), {message: "Age too old"})
        .max(new Date(), {message: "Too young"}).optional(),
        gender: string({
            invalid_type_error: "Enter a valid gender",
        }).optional(),
        image: string({
           invalid_type_error: "Enter a valid image url",
        }).optional(),
        address: string({
            invalid_type_error: "Enter a valid address",
        }).optional(),
        role: string({
            invalid_type_error: "Enter a valid role",
        }),
        type: string({
            invalid_type_error: "Enter a valid user type",
        }),
        status: string({
            invalid_type_error: "Enter a valid status"
        }).optional(),
        createdBy: string({
            required_error: "Created-by field required",
            invalid_type_error: "Invalid userId"
        }).cuid({message: "Invalid UserId"}),
        updatedBy: string({
            invalid_type_error: "Updated-by, not a valid field"
        }).optional(),
       
    })
    
})
export const updateUserSchema = object({
    body: object({
         
        email: string({
            invalid_type_error: "Email must be a string",
        }).email({message: "Invalid email address"}).optional(),
        SAID: number({
            invalid_type_error: "Invalid SAID",
        }).optional(),
        phone: string({
            invalid_type_error: "invalid Phone number",
        }).startsWith("0", {message: "Phone must start with '0'"}).optional(),
        firstName: string({
            invalid_type_error: "invalid Name ",
        }).refine((value) => value.length > 2, {
            message: "firstName must be provided"
        }).optional(),
        lastName: string({
            invalid_type_error: "invalid Name ",
        }).refine((value) => value.length > 2, {
            message: "lastName must be provided"
        }).optional(),
        dateOfBirth: coerce.date({
            invalid_type_error: "invalid Date of birth",
        }).min(new Date("1930-01-01"), {message: "Age too old"})
        .max(new Date(), {message: "Too young"}).optional(),
        gender: string({
            invalid_type_error: "Enter a valid gender",
        }).optional(),
        image: string({
           invalid_type_error: "Enter a valid image url",
        }).optional(),
        address: string({
            invalid_type_error: "Enter a valid address",
        }).optional(),
        role: string({
            invalid_type_error: "Enter a valid role",
        }).optional(),
        type: string({
            invalid_type_error: "Enter a valid user type",
        }).optional(),
        status: string({
            invalid_type_error: "Enter a valid status"
        }).optional(),
        createdBy: string({
            invalid_type_error: "Invalid userId"
        }).optional(),
        updatedBy: string({
            invalid_type_error: "Updated-by, not a valid field"
        }).optional(),
       
    })
    
})