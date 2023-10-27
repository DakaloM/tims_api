import { array, coerce, number, object, string, date } from "zod";

export const insuranceSchema = object({
    body: object({
        companyName: string({
            required_error: "Required value 'CompanyName' is not provided",
            invalid_type_error: "invalid value provided for the field 'CompanyName'",
        }),
        startDate: string({
            required_error: "Start date is required",
            invalid_type_error: "Invalid start date provided",
        }),
        vehicleId: string({
            required_error: "VehicleId is required",
            invalid_type_error: "Invalid vehicleId provided",
        }).cuid({message: "Invalid vehicle id"})
      
      
    })
})
export const updateInsuranceSchema = object({
    body: object({
        companyName: string({
            invalid_type_error: "invalid value provided for the field 'CompanyName'",
        }).optional(),
        startDate: string({
            invalid_type_error: "Invalid start date provided",
        }).optional(),

      
    })
})