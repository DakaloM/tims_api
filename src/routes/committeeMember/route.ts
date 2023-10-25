import db from "../../config/connection";
import express, { Response, Request } from "express";
import validate from "../../middleware/validateResource";
import { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization, verifyTokenAndSuperUser } from "../../middleware/verifyToken";
import { findAssociation } from "../../validation/association";
import { updateVehicleSchema, vehicleSchema } from "../../schema/vehicle.schema";
import { duplicateRegNumber } from "../../validation/vehicle";
import { financeSchema, updateFinanceSchema } from "../../schema/finance.schema";
import { duplicateVehicle } from "../../validation/finance";
import { committeeMemberSchema, updateCommitteeMemberSchema } from "../../schema/committeeMember.schema";
import { duplicateMember } from "../../validation/committeMember";



const router = express.Router();

// Create Committee member
router.post("/",verifyTokenAndAdmin,validate(committeeMemberSchema),async (req: Request, res: Response) => {
    const {userId, committeeId} = req.body
    
    const duplicate = await duplicateMember(committeeId,userId);
    if(duplicate){
        return res.status(409).json({message: "Committee member is already registered"})
    }

    // create
    try {
        await db.committeeMember.create({
            data: {
                ...req.body,
            }
        })
        return res.status(201).json({message: "Member added successfully"});
    } catch (error) {
        return res.status(500).json({error, message: "Failed to add new member"});
    }
})

// update Committee member
router.patch("/:id",verifyTokenAndAdmin,validate(updateCommitteeMemberSchema),async (req: Request, res: Response) => {
    const id = req.params.id
    const committeeMember = await db.committeeMember.findUnique({
        where: {id: id}
    })
    if(!committeeMember){
        return res.status(404).json({message: "Member not found"})
    }

    // update
    try {

        await db.committeeMember.update({
            where: {id: id},
            data: {
                ...req.body
            }
        })
        return res.status(200).json({message: "Member updated successfully"})
    } catch (error) {
        return res.status(500).json({error, message: "Failed to update cMember"})
    }
})

// delete member
router.delete("/:id",verifyTokenAndSuperUser,async (req: Request, res: Response) => {

    const id = req.params.id
    const committeeMember = await db.committeeMember.findUnique({
        where: {id: id}
    })

    if(!committeeMember) {
        return res.status(404).json({message: "Member not found"})
    }

    // delete member
    try {
        await db.committeeMember.delete({
            where:{id: id}
        })
        return res.status(201).json({message: "Member deleted successfully"})
    } catch (error) {
        return res.status(500).json({error, message: "Failed to delete Member"})
    }
})

// get a member
router.get("/:id", verifyToken, async (req: Request, res: Response) => {

    const id = req.params.id

    // get a member
    let results;
    try {
        const committeeMember = await db.committeeMember.findUnique({
            where:{id: id}
        })
        if(!committeeMember) {
            return res.status(404).json({message: "Member not found"})
        }

        try {
            const user = await db.user.findUnique({
                where: {id: committeeMember.userId}
            })

            if(!user) {
                return res.status(404).json({message: "This member has no user Account"})
            }
            const {password, ...others} = user
             results = {
                ...committeeMember,
                user: {...others}
             }
        } catch (error) {
            return res.status(404).json({message: "Failed to get Member account"})
        }
        return res.status(200).json(results)
    } catch (error) {
        return res.status(500).json({error, message: "Failed to get member"})
    }
})

// get all members for aa association
router.get("/association/:associationId", verifyTokenAndAdmin,async (req: Request, res: Response) => {
    const id = req.params.associationId
    const association = await findAssociation(id)

    if(!association) {
        return res.status(404).json({message: "association not found"})
    }
    // get all members
    try {
        const committeeMembers = await db.committeeMember.findMany({
            where:{
                associationId: id
            }
        })
        return res.status(201).json(committeeMembers)
    } catch (error) {
        return res.status(500).json({error, message: "Failed to retrieve Members"})
    }
})
// get all members for a committee
router.get("/committee/:committeeId", verifyTokenAndAdmin,async (req: Request, res: Response) => {
    const id = req.params.committeeId
    const committee = await db.committee.findUnique({
        where: {id: id}
    })

    if(!committee) {
        return res.status(404).json({message: "Committee not found"})
    }
    // get all members
    try {
        const committeeMembers = await db.committeeMember.findMany({
            where:{
                committeeId: id
            }
        })
        return res.status(201).json(committeeMembers)
    } catch (error) {
        return res.status(500).json({error, message: "Failed to retrieve Members"})
    }
})





export default router
