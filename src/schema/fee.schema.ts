import {coerce, number, object, string } from "zod";

export const feeSchema = object({
    body: object({
        type: string({
            required_error: "type is required",
            invalid_type_error: "Enter a valid type",
        }),
        userId: string({
            required_error: "userId is required",
            invalid_type_error: "Invalid userId provided"
        }),
        vehicleId: string({
            invalid_type_error: "Invalid vehicleId provided"
        }).optional(),
        outstandingAmount: number({
            required_error: "outstandingAmount is required",
            invalid_type_error: "Invalid outstandingAmount provided"
        }),
        payedAmount: number({
            required_error: "payedAmount is required",
            invalid_type_error: "Invalid payedAmount provided"
        }),
        datePayed: coerce.date({
            required_error: "datePayed is required",
            invalid_type_error: "Invalid datePayed provided"
        }),
        dueDate: coerce.date({
            required_error: "dueDate is required",
            invalid_type_error: "Invalid dueDate provided"
        }),
        proofOfPayment: string({
            required_error: "proofOfPayment is required",
            invalid_type_error: "Invalid proofOfPayment provided"
        }),
        paymentType: string({
            required_error: "paymentType is required",
            invalid_type_error: "Invalid paymentType provided"
        }),
        recurring: string({
            required_error: "recurring is required",
            invalid_type_error: "Invalid recurring provided"
        }),
        status: string({
            required_error: "status is required",
            invalid_type_error: "Invalid status provided"
        }),
        associationId: string({
            required_error: "associationId required",
            invalid_type_error: "Invalid associationId",
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