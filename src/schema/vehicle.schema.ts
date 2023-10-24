import { array, coerce, number, object, string } from "zod";

export const vehicleSchema = object({
    body: object({
        make: string({
            required_error: "Required value 'car Make' is not provided",
            invalid_type_error: "invalid value provided for the field 'car make",
        }),
        model: string({
            required_error: "Model is requyired",
            invalid_type_error: "Invalid model provided" 
        }),
        color: string({
            required_error: "Color is required",
            invalid_type_error: "Invalid color provided" 
        }),
        year: number({
            required_error: "Required value Year is not provided",
            invalid_type_error: "Invalid year provided",
        }),
        registrationNumber: string({
            required_error: "Required value registrationNumber is not provided",
            invalid_type_error: "Invalid registrationNumber",
        }),
        insured: coerce.boolean({
            required_error: "Insured value is required",
            invalid_type_error: "Invalid value provided for insured field"
        }),
        financed: coerce.boolean({
            required_error: "Financed value is required",
            invalid_type_error: "Invalid value provided for financed field"
        }),
        associationId: string({
            required_error: "Required value AssociationId is not provided",
            invalid_type_error: "Invalid associationId",
        }), 
        routeId: string({
            invalid_type_error:"Invalid RouteId provided",
        }).optional(),
        type: string({
            required_error: "Required value vehicleType is not provided",
            invalid_type_error: "Invalid vehicleType type provided"
        }),
        ownerId: string({
            required_error: "OwnerId is required",
            invalid_type_error: "Invalid OwnerId provided"
        }).optional(),
        driverIds: string({
            invalid_type_error: "Invalid driverId provided"
        }).array().optional(),
        currentDriverId: string({
            invalid_type_error: "Invalid driverId provided"
        }).optional(),
        area: string({
            invalid_type_error: "Invalid area provided"
        }).optional(),
        status: string({
            invalid_type_error: "invalid vehicle status provided"
        }).optional(),
        createdBy: string({
            required_error: "Crteated-by field required"
        }),
        updatedBy: string({
            invalid_type_error: "Updated-by, not a valid field"
        }).optional(),
        stripStatus: string({
            invalid_type_error: "Invlaid trip status provided"
        }).optional(),
        image: string({
            required_error: "Vehicle image is required",
            invalid_type_error: "invalid image provided",
        }),
        
      
    })
})