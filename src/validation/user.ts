import db from "../config/connection"

const duplicateSAID = async(SAID: number) => {
    const duplicate = await db.user.findUnique({
        where: {SAID: SAID}
    })

    if(duplicate) {
        return true;
    }
    return false
}

const duplicateEmail = async(email: string) => {
    const duplicate = await db.user.findUnique({
        where: {email: email}
    })

    if(duplicate) {
        return true;
    }
    return false
}
const duplicatePhone = async(phone: string) => {
    const duplicate = await db.user.findUnique({
        where: {phone: phone}
    })

    if(duplicate) {
        return true;
    }
    return false
}

export {duplicateEmail, duplicatePhone, duplicateSAID}