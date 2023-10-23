
import db from "../config/connection";


const duplicateName = async (name: string) => {
    const nameExist = await db.association.findFirst({
        where: {
            name: name
        }
    })

    if(nameExist){
        return true
    }
    return false
}
const duplicateRegistration = async (regNumber: string) => {
    const RegExist = await db.association.findUnique({
        where: {
            registrationNumber: regNumber
        }
    })

    if(RegExist){
        return true
    }
    return false
}

export {duplicateName, duplicateRegistration}