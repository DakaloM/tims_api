import { coerce, number, object, string } from "zod";

export const committeeMemberSchema = object({
    body: object({

        userId: string({
            required_error: "Phone required",
            invalid_type_error: "invalid Phone number",
        }),
        associationId: string({
            required_error: "Phone required",
            invalid_type_error: "invalid Phone number",
        }),
        role: string({
            required_error: "Role is required",
            invalid_type_error: "Invalid userId",
        }),
        committeeId: string({
            required_error: "CommitteeId required",
            invalid_type_error: "Invalid committeeId"
        }),

        createdBy: string({
            required_error: "Created-by field required"
        }),

    })
})
export const updateCommitteeMemberSchema = object({
    body: object({

        role: string({
            invalid_type_error: "Invalid userId",
        }).optional(),

        updatedBy: string({
            required_error: "Created-by field required",
            invalid_type_error: "Invalid userId provided"
        }).cuid(),

    })
})