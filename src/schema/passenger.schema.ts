import { array, coerce, number, object, string, date } from "zod";

export const passengerSchema = object({
    body: object({
        associationId: string({
            required_error: "AssociationId required",
            invalid_type_error: "Invalid associationId",
        }),  
        manifestId: string({
            required_error: "ManifestId required",
            invalid_type_error: "Invalid manifestId"
        }),
        email: string({
            invalid_type_error: "Email must be a string",
        }).email({message: "Invalid email address"}).optional(),
        SAID: number({
            required_error: "SAID is required",
            invalid_type_error: "Invalid SAID",
        },
        ),
        phone: string({
            required_error: "Phone required",
            invalid_type_error: "invalid Phone number",
        }).startsWith("0", {message: "Phone must start with '0'"}),
        firstName: string({
            required_error: "First name required",
            invalid_type_error: "invalid Name ",
        }),
        lastName: string({
            required_error: "Last name required",
            invalid_type_error: "invalid Name ",
        }),
        gender: string({
            required_error: "Gender is required",
            invalid_type_error: "Enter a valid gender",
        }),
        address: string({
            required_error: "address is required",
            invalid_type_error: "Enter a valid address",
        }),
        createdBy: string({
            required_error: "Crteated-by field required",
            invalid_type_error: "Invalid userid"
        }),
        updatedBy: string({
            invalid_type_error: "Updated-by, not a valid field"
        }).optional(),
       
    })
})