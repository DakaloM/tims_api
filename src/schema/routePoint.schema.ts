import { array, coerce, number, object, string, date } from "zod";

export const RoutePointSchema = object({
    body: object({
        name: string({
            required_error: "Required value 'name' is not provided",
            invalid_type_error: "invalid value provided for the field 'name'",
        }),
        rank: coerce.boolean({
            required_error: "Rank is required",
            invalid_type_error: "Invalid rank value provided",
        }),
        coordinates: string({
            invalid_type_error: "Invalid vehicleId provided",
        }).optional(),
        routeId: string({
            required_error: "RouteId is required",
            invalid_type_error: "Invalid routeId provided",
        }),
        createdBy: string({
            required_error: "Crteated-by field required",
            invalid_type_error: "Invalid userId"
        }),
        address: string({
            required_error: "Address is required",
            invalid_type_error: "Invalid address provided"
        }),
      
      
    })
})