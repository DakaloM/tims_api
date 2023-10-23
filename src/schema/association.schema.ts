import { object, string } from "zod";

export const associationSchema = object({
    body: object({
        name: string({
            required_error: "Association Name required",
            invalid_type_error: "Invalid association name",
        }),
        registrationNumber: string({
            required_error: "Registration number required",
            invalid_type_error: "Invalid reqistration Number",
        }),
        address: string({
            required_error: "Address required",
            invalid_type_error: "invalid address"
        }),
        area: string({
            required_error: "Area of operation required",
            invalid_type_error: "incvalid value provided for area of operation",
        }),
        updatedBy: string({
            invalid_type_error: "Invalid value provided for updated by field",
        }),

    })
})