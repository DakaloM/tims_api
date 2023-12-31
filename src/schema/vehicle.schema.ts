import { array, coerce, number, object, string } from "zod";

export const vehicleSchema = object({
    body: object({
        make: string({
            required_error: "Required value 'car Make' is not provided",
            invalid_type_error: "invalid value provided for the field 'car make",
        }),
        model: string({
            required_error: "Model is required",
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
        insured: string({
            required_error: "Insured value is required",
            invalid_type_error: "Invalid value provided for insured field"
        }),
        financed: string({
            required_error: "Financed value is required",
            invalid_type_error: "Invalid value provided for financed field"
        }),
        associationId: string({
            required_error: "Required value AssociationId is not provided",
            invalid_type_error: "Invalid associationId",
        }).cuid({message: "Invalid association Id"}), 
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
            required_error: "Created-by field required"
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
export const updateVehicleSchema = object({
    body: object({
        make: string({
            invalid_type_error: "invalid value provided for the field 'car make",
        }).optional(),
        model: string({
            invalid_type_error: "Invalid model provided" 
        }).optional(),
        color: string({
            invalid_type_error: "Invalid color provided" 
        }).optional(),
        year: number({
            invalid_type_error: "Invalid year provided",
        }).optional(),
        registrationNumber: string({
            invalid_type_error: "Invalid registrationNumber",
        }).optional(),
        insured: coerce.boolean({
            invalid_type_error: "Invalid value provided for insured field"
        }).optional(),
        financed: coerce.boolean({
            invalid_type_error: "Invalid value provided for financed field"
        }).optional(),
        routeId: string({
            invalid_type_error:"Invalid RouteId provided",
        }).optional(),
        type: string({
            invalid_type_error: "Invalid vehicleType type provided"
        }).optional(),
        ownerId: string({
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
        updatedBy: string({
            required_error: "updatedBy is required",
            invalid_type_error: "Updated-by, not a valid field"
        }).cuid({message: "Invalid association Id"}),
        stripStatus: string({
            invalid_type_error: "Invalid trip status provided"
        }).optional(),
        image: string({
            invalid_type_error: "invalid image provided",
        }).optional(),
        
      
    })
})