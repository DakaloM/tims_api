import db from "../config/connection";

const vehicleTripStatus = async (vId: string) => {

    const vehicle = await db.vehicle.findUnique({
        where: {
            id: vId
        }
    })

    if(vehicle?.tripStatus === "TRIP"){
        return true
    }

    return false
}

export {vehicleTripStatus}