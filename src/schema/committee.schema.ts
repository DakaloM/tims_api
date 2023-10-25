import { object, string } from "zod";

export const committeeSchema = object({
    body: object({
        name: string({
            required_error: "name is required",
            invalid_type_error: "Enter a valid name",
        }),
        associationId: string({
            required_error: "AssociationId required",
            invalid_type_error: "Invalid associationId",
        }), 

    })
})
export const updateCommitteeSchema = object({
    body: object({
        name: string({
            invalid_type_error: "Enter a valid name",
        }).optional(),
        

    })
})