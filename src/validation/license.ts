import db from "../config/connection";

const duplicateLicenseNumber = async (value: string) => {
    const duplicate = await db.license.findUnique({
        where: {
            licenseNumber : value
        }
    });
    if(duplicate) {
        return true;
    }

    return false
}

export {duplicateLicenseNumber};