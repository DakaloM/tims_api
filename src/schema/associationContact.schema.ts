import { object, string } from "zod";

export const associationContactSchema = object({
    body: object({
        associationId: string({
            required_error: "required field AssociationId is not provided",
            invalid_type_error: "invalid value provided for associationId"
        }).cuid({message: "Invalid association Id"}),
        email: string({
            required_error: "required field Email in not provided",
            invalid_type_error: "invalid email address"
        }).email({
            message: "invalid email address"
        }),
        role: string({
            invalid_type_error: "invalid role provided"
        }).optional(),
        phone: string({
            required_error: "Phone required",
            invalid_type_error: "invalid Phone number",
        }).startsWith("0", {message: "Phone must start with '0'"}),
        image: string({
            invalid_type_error: "Enter a valid image url",
         }).optional(),
         names: string({
            required_error: "Required value Names is not privided",
            invalid_type_error: "Invalid name provided"
         }),
         createdBy: string({
            required_error: "Id of the user creating this record is required",
            invalid_type_error:"Invalid value provided for the user Id",
         }).cuid({message: "Invalid UserId"}),
         updatedBy: string({
            invalid_type_error:"Invalid value provided for the user Id",
         }).optional(),
         status: string({
            required_error: "required field status is not provided",
            invalid_type_error: "Invalid status value provided"
         }).optional()
    })
})
export const updateAssociationContactSchema = object({
    body: object({
        
        email: string({
            required_error: "required field Email in not provided",
            invalid_type_error: "invalid email address"
        }).email({
            message: "invalid email address"
        }).optional(),
        role: string({
            invalid_type_error: "invalid role provided"
        }).optional(),
        phone: string({
            required_error: "Phone required",
            invalid_type_error: "invalid Phone number",
        }).startsWith("0", {message: "Phone must start with '0'"}).optional(),
        image: string({
            invalid_type_error: "Enter a valid image url",
         }).optional(),
         names: string({
            invalid_type_error: "Invalid name provided"
         }).optional(),
        
         updatedBy: string({
            required_error: "User id is required",
            invalid_type_error:"Invalid value provided for the user Id",
         }).cuid({message: "invalid user Id"}),
         status: string({
            required_error: "required field status is not provided",
            invalid_type_error: "Invalid status value provided"
         }).optional()
    })
})
