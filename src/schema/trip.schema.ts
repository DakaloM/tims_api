import { array, coerce, number, object, string, date } from "zod";

export const tripSchema = object({
    body: object({
        routeId: string({
            required_error: "Required value 'routeId' is not provided",
            invalid_type_error: "invalid value provided for the field 'routeId'",
        }),
        vehicleId: string({
            required_error: "VehicleId is required",
            invalid_type_error: "Invalid vehicleId provided"
        }),
    
        duration: string({
            invalid_type_error: "Invalid duration provided"
        }).optional(), 
        type: string({
            required_error: "type is required",
            invalid_type_error: "Invalid type provided",
        }),
        associationId: string({
            required_error: "AssociationId is required",
            invalid_type_error: "Invalid AssociationId provided"
        }),
        queueId: string({
            invalid_type_error: "Invalid queueId"
        }).optional(),
        createdBy: string({
            required_error: "Created-by field required",
            invalid_type_error: "Invalid userId"
        }),
        status: string({
            invalid_type_error: "Invalid userId"
        }).optional(),

      
    })
})
export const updateTripSchema = object({
    body: object({
        routeId: string({
            invalid_type_error: "invalid value provided for the field 'routeId'",
        }).optional(),
        vehicleId: string({
            invalid_type_error: "Invalid vehicleId provided"
        }).optional(),
        startTime: string({
            invalid_type_error: "Invalid startTime provided"
        }).optional(),
        endTime: string({
            invalid_type_error: "Invalid endTime provided"
        }).optional(),
        duration: string({
            invalid_type_error: "Invalid duration provided"
        }).optional(), 
        type: string({
            invalid_type_error: "Invalid type provided",
        }).optional(),
        queueId: string({
            invalid_type_error: "Invalid queueId"
        }).optional(),

        updatedBy: string({
            required_error: "Updated-By field is required",
            invalid_type_error: "Updated-by, not a valid field"
        }),
        status: string({
            invalid_type_error: "Invalid userId"
        }).optional(),

      
    })
})