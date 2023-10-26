import db from "../../config/connection";
import express, { Response, Request } from "express";
import validate from "../../middleware/validateResource";
import { verifyTokenAndAdmin, verifyTokenAndSuperUser } from "../../middleware/verifyToken";
import { applicationSchema, updateApplicationSchema } from "../../schema/application.schema";
import { duplicateEmail } from "../../validation/application";



const router = express.Router();

// Create a application
router.post("/",validate(applicationSchema),async (req: Request, res: Response) => {

    const {phone,SAID, email, positionId ,...others} = req.body;
    const emailExist = await duplicateEmail(email, positionId)
    const emailPhone = await duplicateEmail(phone, positionId)
    const emailSAID = await duplicateEmail(SAID, positionId)
    
    if(emailExist) {
        return res.status(409).json({message: "This email has already applied for the position"})
    }
    
    if(emailPhone) {
        return res.status(409).json({message: "This Phone number has already applied for the position"})
    }
    
    if(emailSAID) {
        return res.status(409).json({message: "This ID number has already applied for the position"})
    }
    

    // create application
    try {
        await db.employmentApplications.create({
            data: {...req.body}
        })
        return res.status(201).json({message: "Your application has been sent"})
    } catch (error) {
        return res.status(500).json({error, message: "Failed to create new application"})
    }
})

// edit application
router.patch("/:id",verifyTokenAndAdmin,validate(updateApplicationSchema),async (req: Request, res: Response) => {

    const id = req.params.id
    const employmentApplication = await db.employmentApplications.findUnique({
        where: {id: id}
    })

    if(!employmentApplication) {
        return res.status(404).json({message: "employmentApplication not found"})
    }

    // edit Application
    try {
        await db.employmentApplications.update({
            where:{id: id},
            data: {...req.body}
        })
        return res.status(201).json({message: "Application updated successfully"})
    } catch (error) {
        return res.status(500).json({error, message: "Failed to update Application"})
    }
})

// delete Application
router.delete("/:id",verifyTokenAndSuperUser,async (req: Request, res: Response) => {

    const id = req.params.id
    const application = await db.employmentApplications.findUnique({
        where: {id: id}
    })

    if(!application) {
        return res.status(404).json({message: "Application not found"})
    }

    // delete application
    try {
        await db.employmentApplications.delete({
            where:{id: id}
        })
        return res.status(201).json({message: "application deleted successfully"})
    } catch (error) {
        return res.status(500).json({error, message: "Failed to delete application"})
    }
})

// get an application
router.get("/:id",async (req: Request, res: Response) => {

    const id = req.params.id

    // get an application
    try {
        const application = await db.employmentApplications.findUnique({
            where:{id: id}
        })
        if(!application) {
            return res.status(404).json({message: "application not found"})
        }
        return res.status(201).json(application)
    } catch (error) {
        return res.status(500).json({error, message: "Failed to get application"})
    }
})


// get all applications for an association
router.get("/association/:associationId",async (req: Request, res: Response) => {

    const id = req.params.associationId
    // check if the association exists
    const association = await db.association.findUnique({
        where: {id : id}
    })
    if(!association) {
        return res.status(404).json({message: "Association not found"})
    }
    // get  ranks
    try {
        const applications = await db.employmentApplications.findMany({
            where: {
                associationId: id
            }
        })
        return res.status(201).json(applications)
    } catch (error) {
        return res.status(500).json({error, message: "Failed to get applications"})
    }
})


export default router