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
        }),
        associationId: string({
            required_error: "Required value AssociationId is not provided",
            invalid_type_error: "Invalid associationId",
        }).cuid({message: "Invalid association Id"}), 
        createdBy: string({
            required_error: "Required userId in not provided",
            invalid_type_error:"Invalid value provided for the user Id",
        }).cuid({message: "Invalid user Id"}),
        
    })
})
export const updateRankSchema = object({
    body: object({
        name: string({
            invalid_type_error: "invalid value provided for the field 'name'",
        }).optional(),
        address: string({
            invalid_type_error: "Invalid address provided" 
        }).optional(),
        image: string({
            invalid_type_error: "Invalid mage Url provided",
        }).url({message: "Invalid Url provided"}).optional(),
        updatedBy: string({
            required_error: "'UpdatedBy' is required",
            invalid_type_error:"Invalid value provided for the user Id",
        }).cuid({message: "Invalid user Id"}),
    })
})