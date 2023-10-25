import { ParseInput } from "zod";
import db from "../config/connection";
import randomGenerator from "../utils/randomGenerator";
import bcrypt from "bcrypt"
import { createUserSchema } from "../schema/user.schema";

const duplicatePassengerPhone = async (value: string) => {
    const duplicate = await db.passenger.findUnique({
        where: {
            phone : value
        }
    });
    if(duplicate) {
        return true;
    }

    return false
}
const duplicatePassengerEmail = async (value: string) => {
    const duplicate = await db.passenger.findUnique({
        where: {
            email : value
        }
    });
    if(duplicate) {
        return true;
    }

    return false
}
const duplicatePassengerID = async (value: number) => {
    const duplicate = await db.passenger.findUnique({
        where: {
            SAID : value
        }
    });
    if(duplicate) {
        return true;
    }

    return false
}



const createUser = async (body: any) => {
    
    const password = randomGenerator(4);
    //hashing password
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);

    try {
      const user = await db.user.create({
        data: {...body, password: hashedPassword}
      })  

      return user
    } catch (error) {
        return false
    }
}

export {duplicatePassengerPhone, duplicatePassengerEmail, duplicatePassengerID, createUser};