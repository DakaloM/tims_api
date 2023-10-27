import {coerce, number, object, string, date } from "zod";

export const shiftSchema = object({
    body: object({
        
        hours: string({
            required_error: "startTime is required",
            invalid_type_error: "Invalid startTime provided"
        }),
        employmentId: string({
            required_error: "employmentId is required",
            invalid_type_error: "Invalid employmentId provided"
        }).cuid({message: "Invalid employment Id"}),
        createdBy: string({
            required_error: "Created-by field required",
            invalid_type_error: "Invalid userId"
        }),
        updatedBy: string({
            invalid_type_error: "Updated-by, not a valid field"
        }).optional(),
     
       
    })
})
export const updateShiftSchema = object({
    body: object({
        
        hours: string({
            invalid_type_error: "Invalid startTime provided"
        }).optional(),

        updatedBy: string({
            required_error: "UpdatedBy is a required field",
            invalid_type_error: "Updated-by, not a valid field"
        }),
     
       
    })
})