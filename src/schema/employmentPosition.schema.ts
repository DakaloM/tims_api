import {coerce, number, object, string, date } from "zod";

export const postSchema = object({
    body: object({
        
        position: string({
            required_error: "position is required",
            invalid_type_error: "Invalid position provided"
        }),
        areaOfOperation: string({
            required_error: "areaOfOperation is required",
            invalid_type_error: "Invalid areaOfOperation provided"
        }),
        duties: string({
            required_error: "duties is required",
            invalid_type_error: "Invalid duties provided"
        }).array(),
        responsibilities: string({
            required_error: "responsibilities is required",
            invalid_type_error: "Invalid responsibilities provided"
        }).array(),
        expectations: string({
            required_error: "expectations is required",
            invalid_type_error: "Invalid expectations provided"
        }).array(),
        employementType: string({
            required_error: "employementType is required",
            invalid_type_error: "Invalid employementType provided"
        }),
        contractLength: string({
            invalid_type_error: "contractLength not a valid field"
        }).optional(),
        postId: string({
            invalid_type_error: "postId, not a valid field"
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