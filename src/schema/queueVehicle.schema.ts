import { array, coerce, number, object, string, date } from "zod";

export const queueVehicleSchema = object({
    body: object({
        queueId: string({
            required_error: "Required value 'queueId' is not provided",
            invalid_type_error: "invalid value provided for the field 'queueId'",
        }),
        queueNumber: number({
            required_error: "Queue number is required",
            invalid_type_error: "Invalid queue number provided"
        }),
        vehicleId: string({
            invalid_type_error: "Invalid vehicleId provided"
        }).optional(),
        RegistrationNumber: string({
            required_error: "RegistrationNumber is required",
            invalid_type_error: "Invalid RegistrationNumber provided",
        }),
        driver: string({
            required_error: "Driver is required",
            invalid_type_error: "Invalid Driver provided"
        }),
        diskNumber: string({
            required_error: "diskNumber field required",
            invalid_type_error: "Invalid diskNumber"
        }),
        status: string({
            required_error: "vehicle status is required",
            invalid_type_error: "Invalid status"
        }).optional(),

      
    })
})