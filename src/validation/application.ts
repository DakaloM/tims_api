
import db from "../config/connection";

const duplicateEmail = async (email: string, positionId: string) => {
    const duplicate = await db.employmentApplications.findFirst({
        where: {
            email: email,
            positionId: positionId
        }
    });
    if(duplicate) {
       return true; 
    }
    
    return false
    
}
const duplicateSAID = async (id: number, positionId: string) => {
    const duplicate = await db.employmentApplications.findFirst({
        where: {
            SAID: id,
            positionId: positionId
        }
    });
    if(duplicate) {
       return true; 
    }
    
    return false
    
}
const duplicatePhone = async (phone: string, positionId: string) => {
    const duplicate = await db.employmentApplications.findFirst({
        where: {
            phone: phone,
            positionId: positionId
        }
    });
    if(duplicate) {
       return true; 
    }
    
    return false
    
}



export {duplicateEmail, duplicateSAID , duplicatePhone}