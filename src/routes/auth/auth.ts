
import { db } from "../../config/connection";
import express, { Response, Request } from "express"
import { RouteFunctionProps } from "../../types";
import validate from "../../middleware/validateResource";
import { supperAccountSchema } from "../../schema/superAccount.schema";
import bcrypt from "bcrypt"
import dotenv from 'dotenv'

const router = express.Router();
dotenv.config();

router.post("/register", validate(supperAccountSchema), async(req:Request, res:Response) => {
    const {email, phone, password, firstName, lastName} = req.body

    //hashing password
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);

    try {
        await db.superAccount.create({
            data: {
                email: email,
                phone: phone,
                firstName: firstName,
                lastName: lastName, 
                password: hashedPassword
            }
        })

        return res.status(201).json({message: "Your account in registered"})
    } catch (error) {
        return res.status(500).json({error, message: "Failed to register"})
    }

    
    return res.status(200).json({hashedPassword:hashedPassword ,message: "it works", ...req.body})
})




export default router