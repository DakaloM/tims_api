import db from "../../config/connection";
import express, { Response, Request } from "express";
import validate from "../../middleware/validateResource";
import { verifyToken, verifyTokenAndAdmin, verifyTokenAndSuperUser } from "../../middleware/verifyToken";
import { findAssociation } from "../../validation/association";
import { dateStringToIso } from "../../utils/methods";
import { duplicateEmployment } from "../../validation/employment";
import { employmentSchema, updateEmploymentSchema } from "../../schema/employment.schema";
import { validateUserId } from "../../validation/shared";



const router = express.Router();

// Create a employment
router.post("/",verifyTokenAndAdmin,validate(employmentSchema),async (req: Request, res: Response) => {
    const {positionId, employeeId, associationId,status,  ...others} = req.body
    const params = {
        pId: positionId,
        eId: employeeId,
        associationId: associationId
    }  
    const duplicate = await duplicateEmployment(params)

    
    if(duplicate){
        return res.status(409).json({message: "The current employee is already in the system"})
    }

    // create
    try {
        req.body.startDate = dateStringToIso(req.body.startDate)
        await db.employment.create({
            data: {
                ...req.body,
            }
        })
        return res.status(201).json({message: "Employment added successfully"});
    } catch (error) {
        return res.status(500).json({error, message: "Failed to add new employment"});
    }
})

// update a employment
router.patch("/:id",verifyTokenAndAdmin,validate(updateEmploymentSchema),async (req: Request, res: Response) => {
    const id = req.params.id
    const employment = await db.employment.findUnique({
        where: {id: id}
    })
    if(!employment){
        return res.status(404).json({message: "employment not found"})
    }

    // update
    try {

        
        await db.employment.update({
            where: {id: id},
            data: {
                ...req.body
            }
        })
        return res.status(200).json({message: "employment updated successfully"})
    } catch (error) {
        return res.status(500).json({error, message: "Failed to update employment"})
    }
})

// delete a employment
router.delete("/:id",verifyTokenAndSuperUser,async (req: Request, res: Response) => {

    const id = req.params.id
    const userId = req.user.id
    const user = await validateUserId(userId);
    if(!user) {
        return res.status(404).json({message: "UserId not found"})
    }
    const employment = await db.employment.findUnique({
        where: {id: id}
    })

    if(!employment) {
        return res.status(404).json({message: "employment not found"})
    }

    // delete employment
    try {
        await db.employment.delete({
            where:{id: id}
        })
        return res.status(201).json({message: "employment deleted successfully"})
    } catch (error) {
        return res.status(500).json({error, message: "Failed to delete employment"})
    }
})

// get a employment
router.get("/:id", verifyToken, async (req: Request, res: Response) => {

    const id = req.params.id

    // get a employment
    try {
        const employment = await db.employment.findUnique({
            where:{id: id}
        })
        if(!employment) {
            return res.status(404).json({message: "employment not found"})
        }
        return res.status(200).json(employment)
    } catch (error) {
        return res.status(500).json({error, message: "Failed to get employment"})
    }
})


// get all employments for an association
router.get("/association/:associationId",async (req: Request, res: Response) => {

    const id = req.params.associationId
    // check if the association exists
    const association = await findAssociation(id)
    if(!association) {
        return res.status(404).json({message: "Association not found"})
    }
    // get  employments
    try {
        const employments = await db.employment.findMany({
            where: {
                associationId: id
            }
        })
        return res.status(201).json(employments)
    } catch (error) {
        return res.status(500).json({error, message: "Failed to get employments"})
    }
})




export default router
