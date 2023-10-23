import { bigint, coerce, date, number, object, string } from "zod";

//@ts-ignore
export const createUserSchema = object({
    body: object({
        associationId: string({
            required_error: "AssociationId required",
            invalid_type_error: "Invalid associationId",
        }),  
        email: string({
            required_error: "Email is required",
            invalid_type_error: "Email must be a string",
        }).email({message: "Invalid email address"}),
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
        dateOfBirth: coerce.date({
            invalid_type_error: "invalid Date of birth",
        }).min(new Date("1930-01-01"), {message: "Age too old"})
        .max(new Date(), {message: "Too young"}).optional(),
        gender: string({
            invalid_type_error: "Enter a valid gender",
        }).optional(),
        image: string({
           invalid_type_error: "Enter a valid image url",
        }).url({message: "invalid image Url"}).optional(),
        address: string({
            invalid_type_error: "Enter a valid address",
        }).optional(),
        role: string({
            invalid_type_error: "Enter a valid role",
        }),
        type: string({
            invalid_type_error: "Enter a valid user type",
        }),
        status: string({
            invalid_type_error: "Enter a valid status"
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