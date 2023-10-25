import db from "../config/connection";

const duplicateVehicleInQueue = async (vId: string) => {
    const duplicate = await db.queueVehicle.findUnique({
        where: {
            vehicleId : vId
        }
    });
    if(duplicate) {
        return true;
    }

    return false
}

export {duplicateVehicleInQueue}