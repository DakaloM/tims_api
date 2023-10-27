import { array, coerce, number, object, string, date } from "zod";

export const routePointSchema = object({
    body: object({
        name: string({
            required_error: "Required value 'name' is not provided",
            invalid_type_error: "invalid value provided for the field 'name'",
        }),
        rank:string({
            required_error: "Rank is required",
            invalid_type_error: "Invalid rank value provided",
        }),
        coordinates: string({
            invalid_type_error: "Invalid vehicleId provided",
        }).optional(),
        routeId: string({
            required_error: "RouteId is required",
            invalid_type_error: "Invalid routeId provided",
        }).cuid({message: "Invalid routeId"}),
        createdBy: string({
            required_error: "Created-by field required",
            invalid_type_error: "Invalid userId"
        }).cuid({message: "Invalid userId"}),
        address: string({
            required_error: "Address is required",
            invalid_type_error: "Invalid address provided"
        }),
      
      
    })
})
export const updateRoutePointSchema = object({
    body: object({
        name: string({
            invalid_type_error: "invalid value provided for the field 'name'",
        }).optional(),
        rank: coerce.boolean({
            invalid_type_error: "Invalid rank value provided",
        }).optional(),
        coordinates: string({
            invalid_type_error: "Invalid vehicleId provided",
        }).optional(),
        routeId: string({
            invalid_type_error: "Invalid routeId provided",
        }).optional(),
        address: string({
            invalid_type_error: "Invalid address provided"
        }).optional(),
      
      
    })
})