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
        }).cuid({message: "Invalid entry"}), 
        assignedTo: string({
            required_error: "AssociationId required",
            invalid_type_error: "Invalid assignee Id",
        }).cuid({message: "Invalid entry"}).optional(), 
        userId: string({
            invalid_type_error: "Invalid userId",
        }).cuid({message: "Invalid entry"}).optional(),
        updatedBy: string({
            invalid_type_error: "Updated-by, not a valid field"
        }).optional()
    })
})
export const updateCommunicationSchema = object({
    body: object({
 
        status: string({
            invalid_type_error: "Invalid userId",
        }).optional(),
        assignedTo: string({
            required_error: "AssociationId required",
            invalid_type_error: "Invalid assignee Id",
        }).cuid({message: "Invalid entry"}).optional(),
        updatedBy: string({
            invalid_type_error: "Updated-by, not a valid field"
        }).optional()
    })
})