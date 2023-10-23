import {coerce, number, object, string, date } from "zod";

export const postSchema = object({
    body: object({
        
        status: string({
            invalid_type_error: "Invalid status provided"
        }).optional(),
        description: string({
            invalid_type_error: "Invalid description provided"
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