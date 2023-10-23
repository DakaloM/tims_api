import {coerce, number, object, string, date } from "zod";

export const employmentSchema = object({
    body: object({
        
        referenceNumber: string({
            required_error: "referenceNumber is required",
            invalid_type_error: "Invalid referenceNumber provided"
        }),
        startDate: coerce.date({
            required_error: "startDate is required",
            invalid_type_error: "Invalid startDate provided"
        }),
        positionId: string({
            required_error: "positionId is required",
            invalid_type_error: "Invalid positionId provided"
        }),
        employeeId: string({
            invalid_type_error: "Invalid employeeId provided"
        }).optional(),
        status: string({
            required_error: "status is required",
            invalid_type_error: "Invalid status provided"
        }),
        availability: string({
            invalid_type_error: "Invalid availability provided"
        }).optional(),
        
       
       
    })
})