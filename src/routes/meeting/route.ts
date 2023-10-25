import db from "../../config/connection";
import express, { Response, Request } from "express";
import validate from "../../middleware/validateResource";
import { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization, verifyTokenAndSuperUser } from "../../middleware/verifyToken";
import { duplicateVehicle } from "../../validation/finance";
import { meetingSchema, updateMeetingSchema } from "../../schema/meeting.schema";
import { findAssociation } from "../../validation/association";



const router = express.Router();

// Create a meeting
router.post("/",verifyTokenAndAuthorization,validate(meetingSchema),async (req: Request, res: Response) => {
   
    
    // create
    try {
        await db.meeting.create({
            data: {
                ...req.body,
            }
        })
        return res.status(201).json({message: "Meeting added successfully"});
    } catch (error) {
        return res.status(500).json({error, message: "Failed to add meeting"});
    }
})

// update meeting
router.patch("/:id", verifyTokenAndAuthorization,validate(updateMeetingSchema),async (req: Request, res: Response) => {
    const id = req.params.id
    const meeting = await db.meeting.findUnique({
        where: {id: id}
    })
    if(!meeting){
        return res.status(404).json({message: "Meeting not found"})
    }

    // update
    try {

        await db.meeting.update({
            where: {id: id},
            data: {
                ...req.body
            }
        })
        return res.status(200).json({message: "meeting updated successfully"})
    } catch (error) {
        return res.status(500).json({error, message: "Failed to update meeting"})
    }
})

// delete a meeting
router.delete("/:id",verifyTokenAndSuperUser,async (req: Request, res: Response) => {

    const id = req.params.id
    const meeting = await db.meeting.findUnique({
        where: {id: id}
    })

    if(!meeting) {
        return res.status(404).json({message: "meeting not found"})
    }

    // delete meeting
    try {
        await db.meeting.delete({
            where:{id: id}
        })
        return res.status(201).json({message: "meeting deleted successfully"})
    } catch (error) {
        return res.status(500).json({error, message: "Failed to delete meeting"})
    }
})

// get a meeting
router.get("/:id", verifyTokenAndAuthorization, async (req: Request, res: Response) => {

    const id = req.params.id

    // get a meeting
    try {
        const meeting = await db.meeting.findUnique({
            where:{id: id}
        })
        if(!meeting) {
            return res.status(404).json({message: "meeting not found"})
        }
        return res.status(200).json(meeting)
    } catch (error) {
        return res.status(500).json({error, message: "Failed to get meeting"})
    }
})

// get all meetings
router.get("/",async (req: Request, res: Response) => {

    // get all meetings
    try {
        const meetings = await db.meeting.findMany()
        return res.status(201).json(meetings)
    } catch (error) {
        return res.status(500).json({error, message: "Failed to retrieve meetings"})
    }
})

// get all meetings for aa association
router.get("/association/:associationId", verifyTokenAndAdmin,async (req: Request, res: Response) => {
    const id = req.params.associationId
    const association = await findAssociation(id);

    if(!association) {
        return res.status(404).json({message: "association not found"})
    }
    // get all meetings
    try {
        const meetings = await db.meeting.findMany({
            where:{
                associationId: id
            }
        })
        return res.status(201).json(meetings)
    } catch (error) {
        return res.status(500).json({error, message: "Failed to retrieve meetings"})
    }
})
// get all meetings for a committee
router.get("/committee/:committeeId", verifyTokenAndAdmin,async (req: Request, res: Response) => {
    const id = req.params.committeeId
    const committee = await db.committee.findUnique({
        where: {id: id}
    })

    if(!committee) {
        return res.status(404).json({message: "Committee not found"})
    }
    // get all meetings
    try {
        const meetings = await db.meeting.findMany({
            where:{
                committeeId: id
            }
        })
        return res.status(201).json(meetings)
    } catch (error) {
        return res.status(500).json({error, message: "Failed to retrieve meetings"})
    }
})





export default router
