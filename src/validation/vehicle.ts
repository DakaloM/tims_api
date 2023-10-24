import db from "../config/connection";

const duplicateRegNumber = async (value: string) => {

    const duplicate = await db.vehicle.findUnique({
        where: {registrationNumber: value}
    })

    if(duplicate) {
        return true;
    }
    return false
}

export {duplicateRegNumber}