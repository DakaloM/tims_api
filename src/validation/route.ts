import db from "../config/connection";

const duplicateRouteName = async (name: string, associationId: string) => {
    const duplicate = await db.route.findFirst({
        where: {
            associationId: associationId,
            name: name
        }
    })

    if(duplicate){
        return true;
    } 

    return false;
} 

export {duplicateRouteName}