import db from "../config/connection";


export interface EmploymentProps {
    pId: string ,
    eId: string,
    associationId: string
}

const duplicateEmployment = async ({pId ,eId, associationId} : EmploymentProps) => {

    const duplicate = await db.employment.findFirst({
        where: {
            positionId : pId,
            employeeId: eId,
            status: "ACTIVE",
            associationId: associationId

        }
    });
    if(duplicate) {
        return true;
    }

    return false
}

export {duplicateEmployment}

