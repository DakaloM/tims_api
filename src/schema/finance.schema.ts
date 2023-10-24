import { array, coerce, number, object, string, date } from "zod";

export const financeSchema = object({
    body: object({
        companyName: string({
            required_error: "Required value 'CompanyName' is not provided",
            invalid_type_error: "invalid value provided for the field 'CompanyName'",
        }),
        startDate: coerce.date({
            required_error: "Start date is required",
            invalid_type_error: "Invalid start date provided",
        }),
        vehicleId: string({
            required_error: "VehicleId is required",
            invalid_type_error: "Invalid vehicleId provided",
        })
      
      
    })
})
export const updateFinanceSchema = object({
    body: object({
        companyName: string({
            invalid_type_error: "invalid value provided for the field 'CompanyName'",
        }).optional(),
        startDate: coerce.date({
            invalid_type_error: "Invalid start date provided",
        }).optional(),
        vehicleId: string({
            invalid_type_error: "Invalid vehicleId provided",
        }).optional()
      
      
    })
})