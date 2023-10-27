import { array, coerce, number, object, string, date } from "zod";

export const queueSchema = object({
    body: object({
        rankId: string({
            required_error: "Required value 'rankId' is not provided",
            invalid_type_error: "invalid value provided for the field 'rankId'",
        }).cuid({message: "Invalid rankId"}),
        routeId: string({
            required_error: "RouteId is required",
            invalid_type_error: "Invalid routeId provided",
        }).cuid({message: "Invalid route"}),
        marshalId: string({
            required_error: "MarshalId is required",
            invalid_type_error: "Invalid marshalId provided"
        }).cuid({message: "Invalid userId"}),
        createdBy: string({
            required_error: "Created-by field required",
            invalid_type_error: "Invalid userId"
        }),

      
      
    })
})
