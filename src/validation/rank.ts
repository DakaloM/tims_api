import db from "../config/connection";


const duplicateRankName = async (name: string, associationId: string ) => {
    const duplicate = await db.rank.findFirst({
        where: {
            associationId: associationId,
            name: name
        }
    });
    if(duplicate){
        return true;
    }
    return false;
}
const duplicateRankAddress = async (address: string, associationId: string ) => {
    const duplicate = await db.rank.findFirst({
        where: {
            associationId: associationId,
            address: address
        }
    });
    if(duplicate){
        return true;
    }
    return false;
}

export {duplicateRankName, duplicateRankAddress}