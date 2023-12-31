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
        }),
        associationId: string({
            required_error: "Required value AssociationId is not provided",
            invalid_type_error: "Invalid associationId",
        }).cuid({message: "Invalid associationId"}), 
        vehicleId: string({
            invalid_type_error: "Invalid associationId",
        }).cuid({message: "Invalid vehicleId"}).optional(), 
        issueDate: string({
            required_error: "Required field 'issue Date' in not provided",
            invalid_type_error:"Invalid issue date provided",
        }),
        type: string({
            required_error: "Required field type is not provided",
            invalid_type_error: "Invalid license type provided"
        }),
        userId: string({
            required_error: "UserId is required",
            invalid_type_error: "Invalid userId provided"
        }).cuid({message: "Invalid userId"}).optional(),

        routeId: string({
            required_error: "RouteId is required",
            invalid_type_error: "Invalid routeId provided"
        }).cuid({message: "Invalid routeId"}).optional(),
        status: string({
            invalid_type_error: "invalid license status provided"
        }).optional(),
        expiryDate: string({
            required_error: "Required field 'expiry Date' in not provided",
            invalid_type_error:"Invalid expiry date provided",
        })
      
    })
})
export const updateLicenseSchema = object({
    body: object({
        licenseNumber: string({
            invalid_type_error: "invalid value provided for the field 'license number'",
        }).optional(),
        code: number({
            invalid_type_error: "Invalid code provided" 
        }).optional(),
        file: string({
            invalid_type_error: "Invalid file Url provided",
        }).optional(),
        issueDate: string({
            invalid_type_error:"Invalid issue date provided",
        }).optional(),
        type: string({
            invalid_type_error: "Invalid license type provided"
        }).optional(),
        userId: string({
            invalid_type_error: "Invalid userId provided"
        }).optional(),

        routeId: string({
            invalid_type_error: "Invalid routeId provided"
        }).optional(),
        status: string({
            invalid_type_error: "invalid license status provided"
        }).optional(),
        expiryDate: string({
            invalid_type_error:"Invalid expiry date provided",
        }).optional(),
      
    })
})