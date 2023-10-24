import  db  from "../../config/connection";
import express, { Response, Request } from "express"
import { RouteFunctionProps } from "../../types";
import validate from "../../middleware/validateResource";
import bcrypt from "bcrypt"
import dotenv from 'dotenv'
import { associationSchema, editAssociationSchema } from "../../schema/association.schema";
import { duplicateName, duplicateRegistration } from "../../validation/association";
import { verifyToken, verifyTokenAndAdmin, verifyTokenAndSuperAccount } from "../../middleware/verifyToken";



const router = express.Router();
dotenv.config();

// Add association
router.post("/",verifyTokenAndSuperAccount, validate(associationSchema), async(req:Request, res:Response) => {
    const {name, registrationNumber, address, area} = req.body
    const nameExists = await duplicateName(name);
    const regNumberExists = await duplicateRegistration(registrationNumber);
    if(nameExists) {
        return res.status(409).json({message: "Association name already exist"});
    }
    if(regNumberExists) {
        return res.status(409).json({message: "Registration number already exist"});
    }

    try {
        await db.association.create({
            data: {
                ...req.body
            }
        })
        return res.status(201).json({message: "Association added successfully!"})
    } catch (error) {
        return res.status(500).json({error, message: "Failed to add association"})
    }


})

//edit Association
router.patch("/:id",verifyTokenAndAdmin, validate(editAssociationSchema), async(req:Request, res:Response) => {
    const id = req.params.id
    const association = await db.association.findUnique({
        where: {
            id: id
        }
    })
    if(!association){
        return res.status(406).json({message: "Association not found"})
    }

    try {
        await db.association.update({
            where: {
                id: id
            },
            data: {
                ...req.body
            }
        })
        return res.status(200).json({message: "Association updated successfully!"})
    } catch (error) {
        return res.status(500).json({error, message: "Failed to update association"})
    }


})

// get All associations 
router.get("/",verifyTokenAndSuperAccount, async(req:Request, res:Response) => {
    try {
        const association = await db.association.findMany();
        return res.status(200).json(association);
    } catch (error) {
        return res.status(406).json({error, message: "No association found"});
    }
})

// get one associations 
router.get("/:id",verifyToken, async(req:Request, res:Response) => {
    try {
        const association = await db.association.findUnique({
            where: {
                id: req.params.id
            }
        });
        return res.status(200).json(association);
    } catch (error) {
        return res.status(406).json({error, message: "Association not found"});
    }
})
// Delete association
router.delete("/:id",verifyTokenAndSuperAccount, async(req:Request, res:Response) => {
    try {
        const association = await db.association.delete({
            where: {
                id: req.params.id
            }
        });
        return res.status(200).json({message: "Association deleted"});
    } catch (error) {
        return res.status(406).json({error, message: "Failed to delete association"});
    }
})

export default router;

