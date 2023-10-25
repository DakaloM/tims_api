import db from "../../config/connection";
import express, { Response, Request } from "express";
import validate from "../../middleware/validateResource";
import { verifyTokenAndAdmin } from "../../middleware/verifyToken";
import { duplicateRankAddress, duplicateRankName } from "../../validation/rank";
import { tripSchema } from "../../schema/trip.schema";



const router = express.Router();

// Create a rank
router.post("/",verifyTokenAndAdmin,validate(tripSchema),async (req: Request, res: Response) => {

    const {name,associationId, address ,...others} = req.body;
    const nameExist = await duplicateRankName(name, associationId)
    const addressExist = await duplicateRankAddress(address, associationId)
    if(nameExist) {
        return res.status(409).json({message: "Rank with the same name already exist"})
    }
    if(addressExist) {
        return res.status(409).json({message: "Rank with the same address already exist"})
    }

    // create rank
    try {
        await db.rank.create({
            data: {...req.body}
        })
        return res.status(201).json({message: "Rank created successfully"})
    } catch (error) {
        return res.status(500).json({error, message: "Failed to add new rank"})
    }
})

// edit a rank
router.patch("/:id",verifyTokenAndAdmin,validate(updateRankSchema),async (req: Request, res: Response) => {

    const id = req.params.id
    const rank = await db.rank.findUnique({
        where: {id: id}
    })

    if(!rank) {
        return res.status(404).json({message: "Rank not found"})
    }

    // edit rank
    try {
        await db.rank.update({
            where:{id: id},
            data: {...req.body}
        })
        return res.status(201).json({message: "Rank updated successfully"})
    } catch (error) {
        return res.status(500).json({error, message: "Failed to update rank"})
    }
})

// delete a rank
router.delete("/:id",verifyTokenAndAdmin,async (req: Request, res: Response) => {

    const id = req.params.id
    const rank = await db.rank.findUnique({
        where: {id: id}
    })

    if(!rank) {
        return res.status(404).json({message: "Rank not found"})
    }

    // delete rank
    try {
        await db.rank.delete({
            where:{id: id}
        })
        return res.status(201).json({message: "Rank deleted successfully"})
    } catch (error) {
        return res.status(500).json({error, message: "Failed to delete rank"})
    }
})

// get a rank
router.get("/:id",async (req: Request, res: Response) => {

    const id = req.params.id

    // get a rank
    try {
        const rank = await db.rank.findUnique({
            where:{id: id}
        })
        if(!rank) {
            return res.status(404).json({message: "Rank not found"})
        }
        return res.status(201).json(rank)
    } catch (error) {
        return res.status(500).json({error, message: "Failed to get rank"})
    }
})

// get all ranks
router.get("/",async (req: Request, res: Response) => {

    // get all ranks
    try {
        const ranks = await db.rank.findMany()
        return res.status(201).json(ranks)
    } catch (error) {
        return res.status(500).json({error, message: "Failed to get rank"})
    }
})
// get all ranks for an association
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
        const ranks = await db.rank.findMany({
            where: {
                associationId: id
            }
        })
        return res.status(201).json(ranks)
    } catch (error) {
        return res.status(500).json({error, message: "Failed to get rank"})
    }
})


export default router