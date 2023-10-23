import { coerce, number, object, string } from "zod";

export const licenseSchema = object({
    body: object({

        name: string({
            required_error: "Name required",
            invalid_type_error: "Invalid name provided"
        }),
        email: string({
            invalid_type_error: "Invalid email address"
        }).email({message: "invalid email address"}).optional(),
        phone: string({
            required_error: "Phone required",
            invalid_type_error: "invalid Phone number",
        }).startsWith("0", {message: "Phone must start with '0'"}),
        role: string({
            required_error: "Role is required",
            invalid_type_error: "Invalid userId",
        }),
        committeeId: string({
            required_error: "CommitteeId required",
            invalid_type_error: "Invalid committeeId"
        }).optional(),

        createdBy: string({
            required_error: "Crteated-by field required"
        }),
        updatedBy: string({
            invalid_type_error: "Updated-by, not a valid field"
        }).optional()
    })
})