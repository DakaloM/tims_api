import db from "../../config/connection";
import express, { Response, Request } from "express";
import validate from "../../middleware/validateResource";
import { verifyToken, verifyTokenAndAdmin, verifyTokenAndSuperUser } from "../../middleware/verifyToken";
import { findAssociation } from "../../validation/association";
import { shiftSchema, updateShiftSchema } from "../../schema/shift.schema";
import { duplicateShift } from "../../validation/shift";



const router = express.Router();

// Create a shift
router.post("/",verifyTokenAndAdmin,validate(shiftSchema),async (req: Request, res: Response) => {
    const {employmentId,  ...others} = req.body
    const duplicate = await duplicateShift(employmentId);
    if(duplicate){
        return res.status(409).json({message: "Shift already added for this employment"})
    }

    // create
    try {
        
        await db.shift.create({
            data: {
                ...req.body,
            }
        })
        return res.status(201).json({message: "shift added successfully"});
    } catch (error) {
        return res.status(500).json({error, message: "Failed to add new shift"});
    }
})

// update a shift
router.patch("/:id",verifyTokenAndAdmin,validate(updateShiftSchema),async (req: Request, res: Response) => {
    const id = req.params.id
    const shift = await db.shift.findUnique({
        where: {id: id}
    })
    if(!shift){
        return res.status(404).json({message: "shift not found"})
    }

    // update
    try {

        
        await db.shift.update({
            where: {id: id},
            data: {
                ...req.body
            }
        })
        return res.status(200).json({message: "shift updated successfully"})
    } catch (error) {
        return res.status(500).json({error, message: "Failed to update shift"})
    }
})

// delete a shift
router.delete("/:id",verifyTokenAndSuperUser,async (req: Request, res: Response) => {

    const id = req.params.id
    const shift = await db.shift.findUnique({
        where: {id: id}
    })

    if(!shift) {
        return res.status(404).json({message: "shift not found"})
    }

    // delete shift
    try {
        await db.shift.delete({
            where:{id: id}
        })
        return res.status(201).json({message: "shift deleted successfully"})
    } catch (error) {
        return res.status(500).json({error, message: "Failed to delete shift"})
    }
})

// get a shift
router.get("/:id", verifyToken, async (req: Request, res: Response) => {

    const id = req.params.id

    // get a shift
    try {
        const shift = await db.shift.findUnique({
            where:{id: id}
        })
        if(!shift) {
            return res.status(404).json({message: "shift not found"})
        }
        return res.status(200).json(shift)
    } catch (error) {
        return res.status(500).json({error, message: "Failed to get shift"})
    }
})


// get all shifts for an employment
router.get("/employment/:employmentId",async (req: Request, res: Response) => {

    const id = req.params.employmentId
    // check if the employment exists
    const employment = await db.employment.findUnique({
        where: {
            id: id
        }
    })
    if(!employment) {
        return res.status(404).json({message: "employment not found"})
    }
    // get  shifts
    try {
        const shifts = await db.shift.findMany({
            where: {
                employmentId: id
            }
        })
        return res.status(201).json(shifts)
    } catch (error) {
        return res.status(500).json({error, message: "Failed to get shifts"})
    }
})




export default router
