import { array, coerce, number, object, string, date } from "zod";

export const tripSchema = object({
    body: object({
        routeId: string({
            required_error: "Required value 'routeId' is not provided",
            invalid_type_error: "invalid value provided for the field 'routeId'",
        }),
        startTime: coerce.date({
            required_error: "startTime is required",
            invalid_type_error: "Invalid startTime provided"
        }),
        endTime: coerce.date({
            invalid_type_error: "Invalid endTime provided"
        }).optional(),
        duration: string({
            invalid_type_error: "Invalid duration provided"
        }).optional(),
        vehicleId: string({
            required_error: "VehicleId is required",
            invalid_type_error: "Invalid vehicleId provided"
        }),
        type: string({
            required_error: "type is required",
            invalid_type_error: "Invalid type provided",
        }),
        associationid: string({
            required_error: "AssociationId is required",
            invalid_type_error: "Invalid AssociationId provided"
        }),
        queueId: string({
            invalid_type_error: "Invalid queueId"
        }).optional(),
        createdBy: string({
            required_error: "Crteated-by field required",
            invalid_type_error: "Invalid userId"
        }),
        updatedBy: string({
            invalid_type_error: "Updated-by, not a valid field"
        }).optional(),
      
    })
})