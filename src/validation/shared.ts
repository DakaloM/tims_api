import db from "../config/connection";


const validateUserId = async (id: string) => {

    const user = await db.user.findUnique({
        where: {
            id: id
        }
    }) || await db.superAccount.findUnique({
        where: {
            id: id
        }
    })

    if(user) {
        return true;
    }

    return false;
}
const validateRouteId = async (id: string) => {

    const found = await db.route.findUnique({
        where: {
            id: id
        }
    }) 

    if(found) {
        return true;
    }

    return false;
}
const validateVehicleId = async (id: string) => {

    const found = await db.vehicle.findUnique({
        where: {
            id: id
        }
    }) 

    if(found) {
        return true;
    }

    return false;
}
const validateAssociationId = async (id: string) => {

    const found = await db.association.findUnique({
        where: {
            id: id
        }
    }) 

    if(found) {
        return true;
    }

    return false;
}


export {validateUserId, validateRouteId, validateVehicleId, validateAssociationId}