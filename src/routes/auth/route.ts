
import  db  from "../../config/connection";
import express, { Response, Request } from "express"
import validate from "../../middleware/validateResource";
import { supperAccountSchema } from "../../schema/superAccount.schema";
import bcrypt from "bcrypt"
import dotenv from 'dotenv'
import { duplicateEmail, duplicatePhone } from "../../validation/superAccount";
import { loginSchema } from "../../schema/login";
import  jwt  from "jsonwebtoken";
import { serializeObject } from "../../utils/serializer";


const router = express.Router();
dotenv.config();

router.post("/register/superUser", validate(supperAccountSchema), async(req:Request, res:Response) => {
    const {email, phone, password, firstName, lastName} = req.body

    const emailExist =  await duplicateEmail(email);
    if(emailExist) {
        return res.status(409).json({message: "Email already exists"})
    }

    const phoneExists = await duplicatePhone(phone);
    if(phoneExists) {
        return res.status(409).json({message: "Phone already exists"})
    }
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

        return res.status(201).json({message: "Your account is registered"})
    } catch (error) {
        return res.status(500).json({error, message: "Failed to register"})
    }

})

// Super user login
router.post("/login/superUser", validate(loginSchema), async(req:Request, res:Response) => {
    
    
    const accessSecret = process.env.ACCESS_TOKEN as string
    const refreshSecret = process.env.REFRESH_TOKEN as string

    //Find use with email
    const user = await db.superAccount.findUnique({
        where: {
            email: req.body.email
        }
    })

    if(!user){
        return res.status(404).json({message: "No Account matches your email"});
    }

    // decrypt password
    const compare = bcrypt.compareSync(req.body.password, user.password);
    if(compare === false) {
        return res.status(403).json({message: "Incorrect email and password"});
    }

    //JWT
    const accessToken = jwt.sign({
        id: user.id,
        role: "supperAccount",
    }, accessSecret, {expiresIn: "30d"} )

    const refreshToken = jwt.sign({
        id: user.id,
    }, accessSecret, {expiresIn: "1d"} )

    //send refresh token using http cookie
    res.cookie('jwt', refreshToken, {
        httpOnly: true,
        maxAge: 20 * 60 * 60 * 1000
    })

    // return data
    const {password, ...others} = user
    res.status(200).json({
        user: {...others, accessToken: accessToken}
    })


})

// All Users login
router.post("/login", validate(loginSchema), async(req:Request, res:Response) => {
    
    
    const accessSecret = process.env.ACCESS_TOKEN as string
    const refreshSecret = process.env.REFRESH_TOKEN as string

    //Find use with email
    const user = await db.user.findUnique({
        where: {
            email: req.body.email
        }
    })

    if(!user){
        return res.status(404).json({message: "No Account matches your email"});
    }

    // decrypt password
    const compare = bcrypt.compareSync(req.body.password, user.password);
    if(compare === false) {
        return res.status(403).json({message: "Incorrect email and password"});
    }

    //JWT
    const accessToken = jwt.sign({
        id: user.id,
        role: user.role,
    }, accessSecret, {expiresIn: "30d"} )

    const newRefreshToken = jwt.sign({
        id: user.id,
    }, accessSecret, {expiresIn: "1d"} )

    //send refresh token using http cookie
    res.cookie('jwt', newRefreshToken, {
        httpOnly: true,
        maxAge: 20 * 60 * 60 * 1000
    })

    // return data
    const {password, refreshToken, ...others} = user
    const returnUser = {...others, accessToken: accessToken}
    res.status(200).json(serializeObject(returnUser))


})




export default router