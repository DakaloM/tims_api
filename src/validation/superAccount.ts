import { NextFunction, Request, Response } from "express"
import db from "../config/connection"

const duplicateEmail = async (email: string) => {
    const duplicateEmail = await db.superAccount.findUnique({
        where: {
            email: email
        }
    })
    if(duplicateEmail) {
        return true
    }
    return false
}
const duplicatePhone = async (phone: string) => {
    const duplicatePhone = await db.superAccount.findUnique({
        where: {
            phone: phone
        }
    })
    if(duplicatePhone) {
        return true
    }
    return false
}

export {duplicateEmail, duplicatePhone}