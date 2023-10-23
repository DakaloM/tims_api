import { coerce, number, object, string } from "zod";

export const meetingSchema = object({
    body: object({
        date: coerce.date({
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
        userId: string({
            invalid_type_error: "Invalid userId",
        }).optional(),
        passengerId: string({
            invalid_type_error: "Invalid passengerId"
        }).optional(),

        createdBy: string({
            required_error: "Crteated-by field required"
        }),
        updatedBy: string({
            invalid_type_error: "Updated-by, not a valid field"
        }).optional()
    })
})