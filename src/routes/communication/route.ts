import { coerce, number, object, string } from "zod";

export const meetingSchema = object({
    body: object({
        date: string({
            required_error: "date is required",
            invalid_type_error: "Enter a valid date",
        }),
        duration: string({
            required_error: "duration is required",
            invalid_type_error: "Invalid duration provided"
        }),
        agenda: string({
            required_error: "Agenda required",
            invalid_type_error: "Invalid Agenda provided"
        }),
        minutes: string({
            required_error: "Minutes is required",
            invalid_type_error: "Invalid meweting minutes"
        }).array(),
        committeeId: string({
            required_error: "committeeId required",
            invalid_type_error: "invalid committeeId",
        }),
        associationId: string({
            required_error: "AssociationId required",
            invalid_type_error: "Invalid associationId",
        }), 
        
        createdBy: string({
            required_error: "Created-by field required",
            invalid_type_error: "invalid userId",
        }).cuid({message: "invalid userId type"}),
        
    })
})
export const updateMeetingSchema = object({
    body: object({
        date: string({
            invalid_type_error: "Enter a valid date",
        }).optional(),
        duration: string({
            invalid_type_error: "Invalid duration provided"
        }).optional(),
        agenda: string({
            invalid_type_error: "Invalid Agenda provided"
        }).optional(),
        minutes: string({
            invalid_type_error: "Invalid meeting minutes"
        }).array().optional(),

        updatedBy: string({
            required_error: "UserId is required",
            invalid_type_error: "Updated-by, not a valid field"
        }).cuid({message: "invalid userId type"}).optional()
    })
})