import { array, coerce, number, object, string, date } from "zod";

export const queueSchema = object({
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
            required_error: "MarshalId is required",
            invalid_type_error: "Invalid marshalId provided"
        }),
        createdBy: string({
            required_error: "Created-by field required",
            invalid_type_error: "Invalid userId"
        }),

      
      
    })
})
export const updateQueueSchema = object({
    body: object({
        rankId: string({
            invalid_type_error: "invalid value provided for the field 'rankId'",
        }).optional(),
        routeId: string({
            invalid_type_error: "Invalid routeId provided",
        }).optional(),
        marshalId: string({
            invalid_type_error: "Invalid marshalId provided"
        }).optional(),

        updatedBy: string({
            required_error: "'updatedBy' is required. Provide userId of the user updating this record" ,
            invalid_type_error: "Invalid userId"
        }),

      
      
    })
})