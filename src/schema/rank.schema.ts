import { object, string } from "zod";

export const rankSchema = object({
    body: object({
        name: string({
            required_error: "Required value 'Name' is not provided",
            invalid_type_error: "invalid value provided for the field 'name'",
        }),
        address: string({
            required_error: "Required value 'address' is not provided",
            invalid_type_error: "Invalid address provided" 
        }),
        image: string({
            required_error: "Required value ImageUrl is not provided",
            invalid_type_error: "Invalid mage Url provided",
        }).url({message: "Invalid Url provided"}),
        associationId: string({
            required_error: "Required value AssociationId is not provided",
            invalid_type_error: "Invalid associationId",
        }), 
        createdBy: string({
            required_error: "Required userId in not provided",
            invalid_type_error:"Invalid value provided for the user Id",
        }).optional(),
        updatedBy: string({
            invalid_type_error:"Invalid value provided for the user Id",
        }).optional(),
    })
})