import db from "../config/connection";
import {FeeType, FeePaymentType, paymentStatus} from "@prisma/client"



const duplicateShift = async (employmentId: string) => {

    const duplicate = await db.shift.findUnique({
        where: {
           employmentId: employmentId

        }
    });
    if(duplicate) {
        return true;
    }

    return false
}

export {duplicateShift}

