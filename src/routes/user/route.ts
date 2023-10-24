import db from "../../config/connection";
import express, { Response, Request } from "express";
import validate from "../../middleware/validateResource";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { createUserSchema, updateUserSchema } from "../../schema/user.schema";
import {
  duplicateEmail,
  duplicatePhone,
  duplicateSAID,
} from "../../validation/user";
import randomGenerator from "../../utils/randomGenerator";
import { verifyTokenAndAdmin } from "../../middleware/verifyToken";
import { UserRole, UserType, UserStatus } from "@prisma/client";
import { bigint } from "zod";
import { serializeObject } from "../../utils/serializer";
import { isEmpty } from "../../utils/methods";


const router = express.Router();
dotenv.config();

// add a user Account
router.post("/",verifyTokenAndAdmin,validate(createUserSchema),async (req: Request, res: Response) => {
    const { email, phone, SAID } = req.body;

    const emailExist = await duplicateEmail(email);
    if (emailExist) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const phoneExists = await duplicatePhone(phone);
    if (phoneExists) {
      return res.status(409).json({ message: "Phone already exists" });
    }

    const IDExists = await duplicateSAID(SAID);
    if (IDExists) {
      return res.status(409).json({ message: "ID number already exists" });
    }

    //hashing password
    const password = randomGenerator(4);
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);

    try {
      const { role, status, ...others } = req.body;
      const newUser = await db.user.create({
        data: {
          ...req.body,
          password: hashedPassword,
        },
      });

      return res
        .status(201)
        .json({
          message: "New account has been added",
          account: {
            email: newUser.email,
            password: password,
            role: newUser.role,
            type: newUser.type,
            status: newUser.status,
          },
        });
    } catch (error) {
      return res
        .status(500)
        .json({ error, message: "Failed to create a new user" });
    }
  }
);

// Get all users
router.get("/",verifyTokenAndAdmin,async (req: Request, res: Response) => {
    
    const query = req.query
    const type = query.type
    const status = query.status
    const role = query.role
    let users: object = {};

    try {
    
        if(!isEmpty(query)){

            if(type){
                const typeQuery = String(type).toUpperCase()
                if(typeQuery === UserType.OWNER){
                    users = await db.user.findMany({
                        where:{type: UserType.OWNER}
                    })
                } else if(typeQuery === UserType.DRIVER) {
                    users = await db.user.findMany({
                        where:{type: UserType.DRIVER}
                    })
                } else if(typeQuery === UserType.COMMUNITY) {
                    users = await db.user.findMany({
                        where:{type: UserType.COMMUNITY}
                    })
                } else if(typeQuery === UserType.STAFF) {
                    users = await db.user.findMany({
                        where:{type: UserType.STAFF}
                    })
                
                } else if(typeQuery === UserType.EXTERNAL) {
                    users = await db.user.findMany({
                        where:{type: UserType.EXTERNAL}
                    })
                
                } else if(typeQuery === UserType.MARSHAL) {
                    users = await db.user.findMany({
                        where:{type: UserType.MARSHAL}
                    })
                }
            } else if (status){
                const statusQuery = String(status).toUpperCase()
                if(statusQuery === UserStatus.NOT_VERIFIED){
                    users = await db.user.findMany({
                        where: {status: UserStatus.NOT_VERIFIED}
                    })
                }
                else if(statusQuery === UserStatus.PENDING){
                    users = await db.user.findMany({
                        where: {status: UserStatus.PENDING}
                    })
                }
                else if(statusQuery === UserStatus.SUSPENDED){
                    users = await db.user.findMany({
                        where: {status: UserStatus.SUSPENDED}
                    })
                }
                else if(statusQuery === UserStatus.VERIFIED){
                    users = await db.user.findMany({
                        where: {status: UserStatus.VERIFIED}
                    })
                }
            } else if (role){
                const roleQuery = String(role).toUpperCase()
                if(roleQuery === UserRole.ADMIN){
                    users = await db.user.findMany({
                        where: {role: UserRole.ADMIN}
                    })
                }
                else if(roleQuery === UserRole.USER){
                    users = await db.user.findMany({
                        where: {role: UserRole.USER}
                    })
                }
            } 
        }else {
            users = await db.user.findMany();    
        }

        return res.status(200).json(serializeObject(users))
        
    } catch (error) {
        return res.status(500).json({error, message: "Failed to retrieve users"})
    }
        
    
  
})

// Get single user
router.get("/:id",verifyTokenAndAdmin,async (req: Request, res: Response) => {
    const id = req.params.id
    try {
        const user = await db.user.findUnique({
            where: {id: id}
        })
        if(!user){
            return res.status(404).json({message: "User not found"})
        }
        return res.status(200).json(serializeObject(user as object))
    } catch (error) {
        return res.status(500).json({error, message: "Failed to retrieve user"})
    }
})

// Update a user
router.patch("/:id",verifyTokenAndAdmin, validate(updateUserSchema) ,async (req: Request, res: Response) => {
    const id = req.params.id
    // check if the user exists
    const user = await db.user.findUnique({
        where: {id: id}
    })
    if(!user) {
        return res.status(404).json({message: "User not found"})
    }

    try {
        await db.user.update({
            where: {id: id},
            data: {...req.body}
        })
        
        return res.status(200).json({message: "User updated successfully"})
    } catch (error) {
        return res.status(500).json({error, message: "Failed to update user"})
    }
})

// Delete a user
router.delete("/:id",verifyTokenAndAdmin ,async (req: Request, res: Response) => {
    const id = req.params.id
    // check if the user exists
    const user = await db.user.findUnique({
        where: {id: id}
    })
    if(!user) {
        return res.status(404).json({message: "User not found"})
    }

    try {
        await db.user.delete({
            where: {id: id},
          
        })
        
        return res.status(200).json({message: "User deleted successfully"})
    } catch (error) {
        return res.status(500).json({error, message: "Failed to delete user"})
    }
})






export default router;
