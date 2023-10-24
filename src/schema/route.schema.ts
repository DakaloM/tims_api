import { object, string } from "zod";

export const routeSchema = object({
    body: object({
        name: string({
            required_error: "Required value 'Name' is not provided",
            invalid_type_error: "invalid value provided for the field 'name'",
        }),
        description: string({
            required_error: "Required field description is not provided",
            invalid_type_error: "Invalid description provided",
        }),
        start: string({
            required_error: "Required field start is not provided",
            invalid_type_error: "Invalid start provided"
        }),
        destination: string({
            required_error: "Required value destination is not provided",
            invalid_type_error: "Invalid destination provided",
        }),
        eta: string({
            invalid_type_error: "invalid eta provided"
        }).optional(),
        associationId: string({
            required_error: "Required value AssociationId is not provided",
            invalid_type_error: "Invalid associationId",
        }), 
        createdBy: string({
            required_error: "Required userId in not provided",
            invalid_type_error:"Invalid value provided for the user Id",
        }),
       
    })
})
export const updateRouteSchema = object({
    body: object({
        name: string({
            invalid_type_error: "invalid value provided for the field 'name'",
        }).optional(),
        description: string({
            invalid_type_error: "Invalid description provided",
        }).optional(),
        start: string({
            invalid_type_error: "Invalid start provided"
        }).optional(),
        destination: string({
            invalid_type_error: "Invalid destination provided",
        }).optional(),
        eta: string({
            invalid_type_error: "invalid eta provided"
        }).optional(), 
        updatedBy: string({
            required_error: "Required userId in not provided",
            invalid_type_error:"Invalid value provided for the user Id",
        }),
       
    })
})