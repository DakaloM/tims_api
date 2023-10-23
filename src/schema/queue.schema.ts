import { array, coerce, number, object, string, date } from "zod";

export const RoutePointSchema = object({
    body: object({
        rankId: string({
            required_error: "Required value 'rankId' is not provided",
            invalid_type_error: "invalid value provided for the field 'rankId'",
        }),
        routeId: string({
            required_error: "RouteId is required",
            invalid_type_error: "Invalid routeId provided",
        }),
        marshalId: string({
            required_error: "Marshalid is required",
            invalid_type_error: "Invalid marshalId provided"
        }),
        createdBy: string({
            required_error: "Crteated-by field required",
            invalid_type_error: "Invalid userId"
        }),
        updatedBy: string({
            invalid_type_error: "Invalid userId"
        }).optional(),
        address: string({
            required_error: "Address is required",
            invalid_type_error: "Invalid address provided"
        }),
      
      
    })
})