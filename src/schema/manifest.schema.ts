import {object, string } from "zod";

export const manifestSchema = object({
    body: object({
        tripId: string({
            required_error: "Required value 'tripId' is not provided",
            invalid_type_error: "invalid value provided for the field 'tripId'",
        }),
 
        associationId: string({
            required_error: "AssociationId is required",
            invalid_type_error: "Invalid AssociationId provided"
        }),
        createdBy: string({
            required_error: "Created-by field required",
            invalid_type_error: "Invalid userId"
        }),

    })
})
