import {coerce, number, object, string, date } from "zod";

export const applicationAnswersSchema = object({
    body: object({
        
        applicantId: string({
            required_error: "applicantId is required",
            invalid_type_error: "Invalid applicantId provided"
        }),
        requirementId: string({
            required_error: "requirementId is required",
            invalid_type_error: "Invalid requirementId provided"
        }),
        requirementQuestion: string({
            required_error: "requirementQuestion required",
            invalid_type_error: "invalid requirementQuestion number",
        }),
        requirementAnswer: string({
            required_error: "requirementAnswer required",
            invalid_type_error: "invalid requirementAnswer ",
        }),
        
       
    })
})