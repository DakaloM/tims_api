import {coerce, number, object, string, date } from "zod";

export const employmentSchema = object({
    body: object({
        
        
        startDate: string({
            required_error: "startDate is required",
            invalid_type_error: "Invalid startDate provided"
        }),
        associationId: string({
            required_error: "associationId is required",
            invalid_type_error: "Invalid position provided"
        }).cuid({message: "Invalid association id"}),
        positionId: string({
            required_error: "positionId is required",
            invalid_type_error: "Invalid positionId provided"
        }).cuid({message: "Invalid association id"}),
        employeeId: string({
            invalid_type_error: "Invalid employeeId provided"
        }).cuid({message: "Invalid association id"}).optional(),
        status: string({
            required_error: "status is required",
            invalid_type_error: "Invalid status provided"
        }),
        availability: string({
            invalid_type_error: "Invalid availability provided"
        }).optional(),
        
       
       
    })
})