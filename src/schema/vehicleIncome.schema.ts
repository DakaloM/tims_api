import {coerce, number, object, string, date } from "zod";

export const feeSchema = object({
    body: object({
        
        date: coerce.date({
            required_error: "date is required",
            invalid_type_error: "Invalid date provided"
        }),
        vehicleId: string({
            required_error: "vehicleId is required",
            invalid_type_error: "Invalid vehicleId provided"
        }),
        amount: number({
            required_error: "amount is required",
            invalid_type_error: "Invalid amount provided"
        }),
        status: string({
            required_error: "status is required",
            invalid_type_error: "Invalid status provided"
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