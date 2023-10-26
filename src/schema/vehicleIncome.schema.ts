import {coerce, number, object, string, date } from "zod";

export const vehicleFeeSchema = object({
    body: object({
        
        date: string({
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
            required_error: "Created-by field required",
            invalid_type_error: "Invalid userId"
        }),
        
    })
})
export const updateVehicleFeeSchema = object({
    body: object({
        
        date: coerce.date({
            invalid_type_error: "Invalid date provided"
        }).optional(),
        vehicleId: string({
            invalid_type_error: "Invalid vehicleId provided"
        }).optional(),
        amount: number({
            invalid_type_error: "Invalid amount provided"
        }).optional(),
        status: string({
            invalid_type_error: "Invalid status provided"
        }).optional(),
        createdBy: string({
            invalid_type_error: "Invalid userId"
        }).optional(),
        updatedBy: string({
            invalid_type_error: "Updated-by, not a valid field"
        }).optional(),
       
    })
})