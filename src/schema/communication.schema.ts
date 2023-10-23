import { coerce, number, object, string } from "zod";

export const communicationSchema = object({
    body: object({
        type: string({
            required_error: "type is required",
            invalid_type_error: "Enter a valid type",
        }),
        subject: string({
            required_error: "subject is required",
            invalid_type_error: "Invalid subject provided"
        }),
        associationId: string({
            required_error: "AssociationId required",
            invalid_type_error: "Invalid associationId",
        }), 
        userId: string({
            invalid_type_error: "Invalid userId",
        }).optional(),
        updatedBy: string({
            invalid_type_error: "Updated-by, not a valid field"
        }).optional()
    })
})