import db from "../config/connection";

const duplicateVehicle = async (id: string) => {

    const duplicate = await db.insurance.findUnique({
        where: {
            vehicleId : id
        }
    });
    if(duplicate) {
        return true;
    }

    return false
}

export {duplicateVehicle}