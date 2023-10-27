import {coerce, number, object, string, date } from "zod";

export const documentSchema = object({
    body: object({
        
        type: string({
            required_error: "type is required",
            invalid_type_error: "Invalid type provided"
        }),
        name: string({
            required_error: "name is required",
            invalid_type_error: "Invalid name provided"
        }),
        
        file: string({
            required_error: "File is required",
            invalid_type_error: "Invalid file provided"
        }),
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
export const updateDocumentSchema = object({
    body: object({
        
        type: string({
            invalid_type_error: "Invalid type provided"
        }).optional(),
        name: string({
            invalid_type_error: "Invalid name provided"
        }).optional(),
        
        file: string({
            invalid_type_error: "Invalid file provided"
        }).optional(),
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
        updatedBy: string({
            required_error: "UpdatedBy is required",
            invalid_type_error: "Updated-by, not a valid field"
        }),
     
       
    })
})