import db from "../config/connection";
import {FeeType, FeePaymentType, paymentStatus} from "@prisma/client"

interface props {
    type: FeeType ,
    userId: string,
    status: paymentStatus, 
    associationId: string
}

const duplicateFee = async ({type ,userId, status, associationId} : props) => {

    const duplicate = await db.fee.findFirst({
        where: {
            type : type,
            userId: userId,
            status: status,
            associationId: associationId

        }
    });
    if(duplicate) {
        return true;
    }

    return false
}

export {duplicateFee}

