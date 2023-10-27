import db from "../../config/connection";
import express, { Response, Request } from "express";
import validate from "../../middleware/validateResource";
import { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization, verifyTokenAndSuperUser } from "../../middleware/verifyToken";
import { findAssociation } from "../../validation/association";
import { documentSchema, updateDocumentSchema } from "../../schema/document.schema";
import { validateUserId } from "../../validation/shared";



const router = express.Router();

// Create a employment
router.post("/",verifyToken,validate(documentSchema),async (req: Request, res: Response) => {
   
    // create
    try {
        
        await db.document.create({
            data: {
                ...req.body,
            }
        })
        return res.status(201).json({message: "Document added successfully"});
    } catch (error) {
        return res.status(500).json({error, message: "Failed to add new document"});
    }
})

// update a document
router.patch("/:id",verifyTokenAndAdmin,validate(updateDocumentSchema),async (req: Request, res: Response) => {
    const id = req.params.id
    const document = await db.document.findUnique({
        where: {id: id}
    })
    if(!document){
        return res.status(404).json({message: "document not found"})
    }

    // update
    try {

        
        await db.document.update({
            where: {id: id},
            data: {
                ...req.body
            }
        })
        return res.status(200).json({message: "document updated successfully"})
    } catch (error) {
        return res.status(500).json({error, message: "Failed to update document"})
    }
})

// delete a document
router.delete("/:id",verifyTokenAndSuperUser,async (req: Request, res: Response) => {

    const id = req.params.id
    const userId = req.user.id
    const user = await validateUserId(userId);
    if(!user) {
        return res.status(404).json({message: "UserId not found"})
    }
    const document = await db.document.findUnique({
        where: {id: id}
    })

    if(!document) {
        return res.status(404).json({message: "document not found"})
    }

    // delete document
    try {
        await db.document.delete({
            where:{id: id}
        })
        return res.status(201).json({message: "document deleted successfully"})
    } catch (error) {
        return res.status(500).json({error, message: "Failed to delete document"})
    }
})

// get a document
router.get("/:id", verifyToken, async (req: Request, res: Response) => {

    const id = req.params.id

    // get a document
    try {
        const document = await db.document.findUnique({
            where:{id: id}
        })
        if(!document) {
            return res.status(404).json({message: "document not found"})
        }
        return res.status(200).json(document)
    } catch (error) {
        return res.status(500).json({error, message: "Failed to get document"})
    }
})


// get all documents for an association
router.get("/association/:associationId",async (req: Request, res: Response) => {

    const id = req.params.associationId
    // check if the association exists
    const association = await findAssociation(id)
    if(!association) {
        return res.status(404).json({message: "Association not found"})
    }
    // get  documents
    try {
        const documents = await db.document.findMany({
            where: {
                associationId: id
            }
        })
        return res.status(201).json(documents)
    } catch (error) {
        return res.status(500).json({error, message: "Failed to get documents"})
    }
})




export default router
