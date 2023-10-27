import  db  from "../../config/connection";
import express, { Response, Request } from "express"
import validate from "../../middleware/validateResource";
import dotenv from 'dotenv'
import { associationSchema, editAssociationSchema } from "../../schema/association.schema";
import { duplicateName, duplicateRegistration, findAssociation } from "../../validation/association";
import { verifyToken, verifyTokenAndAdmin, verifyTokenAndSuperAccount } from "../../middleware/verifyToken";
import { validateUserId } from "../../validation/shared";



const router = express.Router();
dotenv.config();

// Add association
router.post("/",verifyTokenAndSuperAccount, validate(associationSchema), async(req:Request, res:Response) => {
    const {name, registrationNumber, createdBy, address, area} = req.body
    const nameExists = await duplicateName(name);
    const regNumberExists = await duplicateRegistration(registrationNumber);
    const userId  = await validateUserId(createdBy)
    if(nameExists) {
        return res.status(409).json({message: "Association name already exist"});
    }
    if(!userId) {
        return res.status(409).json({message: "user not found"});
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
    const id = req.params.id;
    const userId = req.user.id
    const user = await validateUserId(userId);
    const association = await findAssociation(id);
    if(!association) {
        return res.status(404).json({message: "Association not found"})
    }

    if(!user) {
        return res.status(404).json({message: "UserId not found"})
    }
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

