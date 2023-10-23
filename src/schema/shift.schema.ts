import {coerce, number, object, string, date } from "zod";

export const employmentSchema = object({
    body: object({
        
        startTime: string({
            required_error: "startTime is required",
            invalid_type_error: "Invalid startTime provided"
        }),
        workingDays: string({
            required_error: "workingDays is required",
            invalid_type_error: "Invalid workingDays provided"
        }).array(),
        offDays: string({
            required_error: "offDays is required",
            invalid_type_error: "Invalid offDays provided"
        }).array(),
        knockOffTime: string({
            required_error: "knockOffTime is required",
            invalid_type_error: "Invalid knockOffTime provided"
        }),
        employmentId: string({
            required_error: "emplymentId is required",
            invalid_type_error: "Invalid emplymentId provided"
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