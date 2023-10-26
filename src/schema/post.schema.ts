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
            required_error: "Created-by field required",
            invalid_type_error: "Invalid userId"
        }),
        associationId: string({
            required_error: "associationId field required",
            invalid_type_error: "Invalid userId"
        }).cuid({message: "Invalid associationId"}),
        updatedBy: string({
            invalid_type_error: "Updated-by, not a valid field"
        }).optional(),
       
       
    })
})
export const updatePostSchema = object({
    body: object({
        
        status: string({
            invalid_type_error: "Invalid status provided"
        }).optional(),
        description: string({
            invalid_type_error: "Invalid description provided"
        }).optional(),
       
        updatedBy: string({
            required_error: "UpdatedBu is required",
            invalid_type_error: "Updated-by, not a valid field"
        }),
       
       
    })
})