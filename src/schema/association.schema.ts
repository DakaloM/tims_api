import { object, string } from "zod";

export const associationSchema = object({
    body: object({
        name: string({
            required_error: "Association Name required",
            invalid_type_error: "Invalid association name",
        }),
        registrationNumber: string({
            required_error: "Registration number required",
            invalid_type_error: "Invalid registration Number",
        }),
        address: string({
            required_error: "Address required",
            invalid_type_error: "invalid address"
        }),
        area: string({
            required_error: "Area of operation required",
            invalid_type_error: "invalid value provided for area of operation",
        }),
        createdBy: string({
            required_error: "specify who is creating this association",
            invalid_type_error: "Invalid value provided for updated by field",
        }).cuid({message: "Invalid  userId"}),
        updatedBy: string({
            invalid_type_error: "Invalid value provided for updated by field",
        }).optional(),

    })
})

export const editAssociationSchema = object({
    body: object({
        name: string({
            invalid_type_error: "Invalid association name",
        }).optional(),
        registrationNumber: string({
            invalid_type_error: "Invalid registration Number",
        }).optional(),
        address: string({
            invalid_type_error: "invalid address"
        }).optional(),
        area: string({
            invalid_type_error: "invalid value provided for area of operation",
        }).optional(),
        updatedBy: string({
            invalid_type_error: "Invalid value provided for updated by field",
        }).optional(),
    })
})