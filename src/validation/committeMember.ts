import db from "../config/connection";

const duplicateMember = async (cId: string, uId: string) => {

    const duplicate = await db.committeeMember.findFirst({
        where: {
            committeeId : cId,
            userId: uId
        }
    });
    if(duplicate) {
        return true;
    }

    return false
}

export {duplicateMember}