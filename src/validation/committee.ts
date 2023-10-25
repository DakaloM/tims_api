import db from "../config/connection";

const duplicateName = async (name: string, assId: string) => {

    const duplicate = await db.committee.findFirst({
        where: {
            name : name,
            associationId: assId
        }
    });
    if(duplicate) {
        return true;
    }

    return false
}

export {duplicateName}