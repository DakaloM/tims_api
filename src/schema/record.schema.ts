import {coerce, number, object, string, date } from "zod";

export const recordSchema = object({
    body: object({
        
        type: string({
            required_error: "type is required",
            invalid_type_error: "Invalid type provided"
        }),
        staffId: coerce.date({
            required_error: "Staffid is required",
            invalid_type_error: "Invalid staffId provided"
        }),
        action: string({
            required_error: "action is required",
            invalid_type_error: "Invalid action provided"
        }),
        message: string({
            invalid_type_error: "Invalid message provided"
        }).optional(),
 
       
    })
})