import {object, string } from "zod";

export const manifestSchema = object({
    body: object({
        tripId: string({
            required_error: "Required value 'tripId' is not provided",
            invalid_type_error: "invalid value provided for the field 'tripId'",
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