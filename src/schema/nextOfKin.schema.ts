import { coerce, number, object, string } from "zod";

export const nextOfKinSchema = object({
    body: object({
        address: string({
            required_error: "address is required",
            invalid_type_error: "Enter a valid address",
        }),
        relationship: string({
            required_error: "relationship is required",
            invalid_type_error: "Invalid relationship provided"
        }),
        names: string({
            required_error: "Names required",
            invalid_type_error: "Invalid names provided"
        }),
        email: string({
            invalid_type_error: "Invalid email address"
        }).email({message: "invalid email address"}).optional(),
        phone: string({
            required_error: "Phone required",
            invalid_type_error: "invalid Phone number",
        }).startsWith("0", {message: "Phone must start with '0'"}),
        userId: string({
            invalid_type_error: "Invalid userId",
        }),
        associationId: string({
            required_error: "AssociationId required",
            invalid_type_error: "Invalid associationId",
        }), 
        createdBy: string({
            required_error: "Crteated-by field required"
        }),
        updatedBy: string({
            invalid_type_error: "Updated-by, not a valid field"
        }).optional()
    })
})
export const updateNextOfKinSchema = object({
    body: object({
        address: string({
            invalid_type_error: "Enter a valid address",
        }).optional(),
        relationship: string({
            invalid_type_error: "Invalid relationship provided"
        }).optional(),
        names: string({
            invalid_type_error: "Invalid names provided"
        }).optional(),
        email: string({
            invalid_type_error: "Invalid email address"
        }).email({message: "invalid email address"}).optional(),
        phone: string({
            invalid_type_error: "invalid Phone number",
        }).startsWith("0", {message: "Phone must start with '0'"}).optional(),
        userId: string({
            invalid_type_error: "Invalid userId",
        }).optional(),
        associationId: string({
            invalid_type_error: "Invalid associationId",
        }), 

        updatedBy: string({
            required_error: "'updated-By' This field is required",
            invalid_type_error: "Updated-by, not a valid field"
        })
    })
})