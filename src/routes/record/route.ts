import db from "../../config/connection";
import express, { Response, Request } from "express";
import validate from "../../middleware/validateResource";
import { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization, verifyTokenAndSuperAccount, verifyTokenAndSuperUser } from "../../middleware/verifyToken";
import { findAssociation } from "../../validation/association";
import { recordSchema } from "../../schema/record.schema";



const router = express.Router();

// Create a record
router.post("/",verifyToken,validate(recordSchema),async (req: Request, res: Response) => {
   
    // create
    try {
        
        await db.record.create({
            data: {
                ...req.body,
            }
        })
        return res.status(201).json({message: "record added successfully"});
    } catch (error) {
        return res.status(500).json({error, message: "Failed to add new record"});
    }
})


// delete a record
router.delete("/:id",verifyTokenAndSuperAccount,async (req: Request, res: Response) => {

    const id = req.params.id
    const record = await db.record.findUnique({
        where: {id: id}
    })

    if(!record) {
        return res.status(404).json({message: "record not found"})
    }

    // delete record
    try {
        await db.record.delete({
            where:{id: id}
        })
        return res.status(201).json({message: "record deleted successfully"})
    } catch (error) {
        return res.status(500).json({error, message: "Failed to delete record"})
    }
})

// get a record
router.get("/:id", verifyTokenAndSuperUser, async (req: Request, res: Response) => {

    const id = req.params.id

    // get a document
    try {
        const record = await db.record.findUnique({
            where:{id: id}
        })
        if(!record) {
            return res.status(404).json({message: "record not found"})
        }
        return res.status(200).json(record)
    } catch (error) {
        return res.status(500).json({error, message: "Failed to get record"})
    }
})

// get all records for an association
router.get("/association/:associationId", verifyTokenAndSuperUser,async (req: Request, res: Response) => {

    const id = req.params.associationId
    // check if the association exists
    const association = await findAssociation(id)
    if(!association) {
        return res.status(404).json({message: "Association not found"})
    }
    // get  documents
    try {
        const records = await db.record.findMany({
            where: {
                associationId: id
            }
        })
        return res.status(201).json(records)
    } catch (error) {
        return res.status(500).json({error, message: "Failed to get records"})
    }
})



export default router
