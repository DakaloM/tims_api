import  db  from "../../config/connection";
import express, { Response, Request } from "express"
import validate from "../../middleware/validateResource";
import dotenv from 'dotenv'
import { verifyToken, verifyTokenAndAdmin, verifyTokenAndSuperAccount } from "../../middleware/verifyToken";
import { associationContactSchema, updateAssociationContactSchema } from "../../schema/associationContact.schema";
import { duplicateEmail, duplicateNames } from "../../validation/associationContact";
import { serializeObject } from "../../utils/serializer";



const router = express.Router();
dotenv.config();

// Add association contact
router.post("/",verifyTokenAndAdmin, validate(associationContactSchema), async(req:Request, res:Response) => {
    
    const {names, email, phone, ...others} = req.body
    const emailExist = await duplicateEmail(email);
    const namesExist = await duplicateNames(names);

    if(emailExist) {
        return res.status(409).json({message: "Email already exist"})
    }
    if(namesExist) {
        return res.status(409).json({message: "Contact Names already exist"})
    }

    // create contact
    try {
        await db.associationContact.create({
            data: {...req.body}
        })
        return res.status(201).json({message: "Contact added successfully"})
    } catch (error) {
        return res.status(500).json({error, message: "Filed to add contact"})
    }
    


})

//edit Association contact
router.patch("/:id",verifyTokenAndAdmin,validate(updateAssociationContactSchema) , async(req:Request, res:Response) => {

    const id = req.params.id
    const contact = await db.associationContact.findUnique({
        where: {id: id}
    })

    if(!contact) {
        return res.status(404).json({message: "Contact not found"})
    }

    try {
        const update = await db.associationContact.update({
            where: {id: id},
            data: {...req.body}
        })
        return res.status(200).json({message: "Contact updated successfully"})
    } catch (error) {
        return res.status(500).json({error, message: "Failed to update contact"})
    }


})

// get All associations contacts
router.get("/", async(req:Request, res:Response) => {
    

    try {
       
        const contacts = await db.associationContact.findMany()
        return res.status(200).json(serializeObject(contacts))
    } catch (error) {
        return res.status(500).json(serializeObject({error, message: "Failed to retrieve contacts"}))
    }
})
// get All associations contacts for an association
router.get("/association/:id", async(req:Request, res:Response) => {
    const id = req.params.id
    // check if the association exists
    const association = await db.association.findUnique({
        where: {id : id}
    })
    if(!association) {
        return res.status(404).json({message: "Association not found"})
    }

    try {
       
        const contacts = await db.associationContact.findMany({
            where: {
                associationId: id,
            }
            
        })
        return res.status(200).json(serializeObject(contacts))
    } catch (error) {
        return res.status(500).json(serializeObject({error, message: "Failed to retrieve contacts"}))
    }
})

// get one associations Contact 
router.get("/:id", async(req:Request, res:Response) => {

    const id = req.params.id
    try {
        const contact = await db.associationContact.findUnique({
            where: {id: id}
        })

        if(!contact) {
            return res.status(404).json({message: "failed to retrieve contact information"})
        }
        return res.status(200).json(serializeObject(contact as object))
    } catch (error) {
        return res.status(500).json({error, message: "failed to retrieve contact information"})
    }
})
// Delete association
router.delete("/:id",verifyTokenAndSuperAccount, async(req:Request, res:Response) => {
    const id = req.params.id
    const contact = await db.associationContact.findUnique({
        where: {id: id}
    })

    if(!contact) {
        return res.status(404).json({message: "Contact not found"})
    }

    try {
        await db.associationContact.delete({
            where: {id: id}
        })
        return res.status(200).json({message: "Contact deleted successfully"})
    } catch (error) {
        return res.status(200).json({error, message: "Failed to delete contact"})
    }
})

export default router;

