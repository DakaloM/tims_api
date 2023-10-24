import db from "../config/connection"

const duplicateNames = async (names: string) => {
    const duplicate = await db.associationContact.findFirst({
        where: {
            names: names
        }
        
    })
    if(duplicate){
        return true;
    }
    return false
}
const duplicateEmail = async (email: string) => {
    const duplicate = await db.associationContact.findFirst({
        where: {
            email: email
        }
        
    })
    if(duplicate){
        return true;
    }
    return false
}
const duplicatePhone = async (phone: string) => {
    const duplicate = await db.associationContact.findFirst({
        where: {
            phone: phone
        }
        
    })
    if(duplicate){
        return true;
    }
    return false
}

export {duplicateEmail, duplicatePhone, duplicateNames}