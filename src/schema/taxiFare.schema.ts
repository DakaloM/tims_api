import {number, object, string } from "zod";

export const taxiFareSchema = object({
    body: object({
        routeId: string({
            required_error: "routeId is required",
            invalid_type_error: "Enter a valid routeId",
        }),
        currentPrice: number({
            required_error: "currentPrice is required",
            invalid_type_error: "Invalid currentPrice provided"
        }),
        previousPrice: number({
            invalid_type_error: "Invalid previousPrice provided"
        }).optional(),
        associationId: string({
            required_error: "associationId required",
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