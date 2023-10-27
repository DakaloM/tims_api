import db from "../../config/connection";
import express, { Response, Request } from "express";
import validate from "../../middleware/validateResource";
import { verifyToken, verifyTokenAndAdmin, verifyTokenAndSuperUser } from "../../middleware/verifyToken";
import { duplicateLicenseNumber } from "../../validation/license";
import { licenseSchema, updateLicenseSchema } from "../../schema/license.schema";
import { findAssociation } from "../../validation/association";
import { dateStringToIso } from "../../utils/methods";



const router = express.Router();

// Create a license
router.post("/",verifyTokenAndAdmin,validate(licenseSchema),async (req: Request, res: Response) => {
    const {licenseNumber, issueDate, expiryDate, associationId, ...others} = req.body
    
    const association = await findAssociation(associationId)
    req.body.issueDate = dateStringToIso(issueDate)
    req.body.expiryDate = dateStringToIso(expiryDate)
    if(!association){
        return res.status(409).json({message: "Association not found"})
    }
    const duplicate = await duplicateLicenseNumber(licenseNumber);
    if(duplicate){
        return res.status(409).json({message: "License number already registered"})
    }

    // create
    try {
        await db.license.create({
            data: {
                ...req.body,
            }
        })
        return res.status(201).json({message: "License added successfully"});
    } catch (error) {
        return res.status(500).json({error, message: "Failed to add new license"});
    }
})

// update a license
router.patch("/:id",verifyTokenAndAdmin,validate(updateLicenseSchema),async (req: Request, res: Response) => {
    const id = req.params.id
    const license = await db.license.findUnique({
        where: {id: id}
    })
    if(!license){
        return res.status(404).json({message: "License not found"})
    }

    // update
    try {

        if(req.body.expiryDate) req.body.expiryDate = dateStringToIso(req.body.expiryDate) 
        if(req.body.issueDate) req.body.issueDate = dateStringToIso(req.body.issueDate);
        await db.license.update({
            where: {id: id},
            data: {
                ...req.body
            }
        })
        return res.status(200).json({message: "License updated successfully"})
    } catch (error) {
        return res.status(500).json({error, message: "Failed to update license"})
    }
})

// delete a license
router.delete("/:id",verifyTokenAndSuperUser,async (req: Request, res: Response) => {

    const id = req.params.id
    const license = await db.license.findUnique({
        where: {id: id}
    })

    if(!license) {
        return res.status(404).json({message: "License not found"})
    }

    // delete license
    try {
        await db.license.delete({
            where:{id: id}
        })
        return res.status(201).json({message: "License deleted successfully"})
    } catch (error) {
        return res.status(500).json({error, message: "Failed to delete license"})
    }
})

// get a license
router.get("/:id", verifyToken, async (req: Request, res: Response) => {

    const id = req.params.id

    // get a license
    try {
        const license = await db.license.findUnique({
            where:{id: id}
        })
        if(!license) {
            return res.status(404).json({message: "License not found"})
        }
        return res.status(200).json(license)
    } catch (error) {
        return res.status(500).json({error, message: "Failed to get license"})
    }
})

// get all licenses
router.get("/", verifyTokenAndAdmin,async (req: Request, res: Response) => {

    // get all license
    try {
        const licenses = await db.license.findMany()
        return res.status(200).json(licenses)
    } catch (error) {
        return res.status(500).json({error, message: "Failed to retrieve licenses"})
    }
})
// get all licenses for an association
router.get("/association/:associationId", verifyTokenAndAdmin,async (req: Request, res: Response) => {

    const id = req.params.associationId
    // check if the association exists
    const association = await findAssociation(id)
    if(!association) {
        return res.status(404).json({message: "Association not found"})
    }
    // get  licenses
    try {
        const licenses = await db.license.findMany({
            where: {
                associationId: id
            }
        })
        return res.status(201).json(licenses)
    } catch (error) {
        return res.status(500).json({error, message: "Failed to get licenses"})
    }
})




export default router
