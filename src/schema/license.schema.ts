import { coerce, number, object, string } from "zod";

export const licenseSchema = object({
    body: object({
        licenseNumber: string({
            required_error: "Required value 'License number' is not provided",
            invalid_type_error: "invalid value provided for the field 'license number'",
        }),
        code: number({
            invalid_type_error: "Invalid code provided" 
        }).optional(),
        file: string({
            required_error: "Required value File is not provided",
            invalid_type_error: "Invalid file Url provided",
        }).url({message: "Invalid Url provided"}),
        associationId: string({
            required_error: "Required value AssociationId is not provided",
            invalid_type_error: "Invalid associationId",
        }), 
        issueDate: coerce.date({
            required_error: "Required field 'issue Date' in not provided",
            invalid_type_error:"Invalid issuedate provided",
        }),
        type: string({
            required_error: "Required fied type is not provided",
            invalid_type_error: "Invalid license type provided"
        }),
        userId: string({
            required_error: "UserId is required",
            invalid_type_error: "Invalid userId provided"
        }).optional(),

        routeId: string({
            required_error: "RouteId is required",
            invalid_type_error: "Invalid routeId provided"
        }).optional(),
        status: string({
            invalid_type_error: "invalid license status provided"
        }).optional(),
        expiryDate: coerce.date({
            required_error: "Required field 'expiry Date' in not provided",
            invalid_type_error:"Invalid expirydate provided",
        }),
      
    })
})