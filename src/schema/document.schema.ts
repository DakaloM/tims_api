import {coerce, number, object, string, date } from "zod";

export const employmentSchema = object({
    body: object({
        
        type: string({
            required_error: "type is required",
            invalid_type_error: "Invalid type provided"
        }),
        issueDate: coerce.date({
            invalid_type_error: "Invalid issueDate provided"
        }).optional(),
        expiryDate: coerce.date({
            invalid_type_error: "Invalid expiryDate provided"
        }).optional(),
        file: string({
            required_error: "File is required",
            invalid_type_error: "Invalid file provided"
        }).url({message: "Invalid file url"}),
        ownerId: string({
            invalid_type_error: "Invalid ownerId provided"
        }).optional(),
        routeId: string({
            invalid_type_error: "Invalid routeId provided"
        }).optional(),
        vehicleId: string({
            invalid_type_error: "Invalid vehicleId provided"
        }).optional(),
        driverId: string({
            invalid_type_error: "Invalid driverId provided"
        }).optional(),
        associationId: string({
            required_error: "AssociationId required",
            invalid_type_error: "Invalid associationId",
        }),  
        createdBy: string({
            required_error: "Crteated-by field required",
            invalid_type_error: "Invalid userId"
        }),
        updatedBy: string({
            invalid_type_error: "Updated-by, not a valid field"
        }).optional(),
     
       
    })
})