import { object, string } from "zod";

export const associationContactSchema = object({
    body: object({
        associationId: string({
            required_error: "required field AssociationId is not provuided",
            invalid_type_error: "invalid value provided for associationId"
        }),
        email: string({
            required_error: "required fiels Email in not provided",
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
         }).url({message: "invalid image Url"}).optional(),
         names: string({
            required_error: "Required value Names is not privided",
            invalid_type_error: "Invalid name provided"
         }),
         createdBy: string({
            required_error: "Id of the user creating this record is required",
            invalid_type_error:"Invalid value provided for the user Id",
         }),
         updatedBy: string({
            invalid_type_error:"Invalid value provided for the user Id",
         }).optional(),
         status: string({
            required_error: "required field status is not provided",
            invalid_type_error: "Invalid status value provided"
         })
    })
})
