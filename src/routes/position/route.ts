import db from "../../config/connection";
import express, { Response, Request } from "express";
import validate from "../../middleware/validateResource";
import { verifyTokenAndAdmin } from "../../middleware/verifyToken";
import { positionSchema } from "../../schema/employmentPosition.schema";
import { updatePostSchema } from "../../schema/post.schema";




const router = express.Router();

// Create a rank
router.post("/",verifyTokenAndAdmin,validate(positionSchema),async (req: Request, res: Response) => {

   

    // create position
    try {
        await db.employmentPosition.create({
            data: {...req.body}
        })
        return res.status(201).json({message: "Position created successfully"})
    } catch (error) {
        return res.status(500).json({error, message: "Failed to add new position"})
    }
})

// update a Position
router.patch("/:id",verifyTokenAndAdmin,validate(updatePostSchema),async (req: Request, res: Response) => {

    const id = req.params.id
    const employmentPosition = await db.employmentPosition.findUnique({
        where: {id: id}
    })

    if(!employmentPosition) {
        return res.status(404).json({message: "Position not found"})
    }

    // edit Position
    try {
        await db.employmentPosition.update({
            where:{id: id},
            data: {...req.body}
        })
        return res.status(201).json({message: "Position updated successfully"})
    } catch (error) {
        return res.status(500).json({error, message: "Failed to update position"})
    }
})

// delete a Position
router.delete("/:id",verifyTokenAndAdmin,async (req: Request, res: Response) => {

    const id = req.params.id
    const employmentPosition = await db.employmentPosition.findUnique({
        where: {id: id}
    })

    if(!employmentPosition) {
        return res.status(404).json({message: "Position not found"})
    }

    // delete employmentPosition
    try {
        await db.employmentPosition.delete({
            where:{id: id}
        })
        return res.status(201).json({message: "Position deleted successfully"})
    } catch (error) {
        return res.status(500).json({error, message: "Failed to delete position"})
    }
})

// get a Position
router.get("/:id",async (req: Request, res: Response) => {

    const id = req.params.id

    // get a position
    try {
        const employmentPosition = await db.employmentPosition.findUnique({
            where:{id: id}
        })
        if(!employmentPosition) {
            return res.status(404).json({message: "Position not found"})
        }
        return res.status(201).json(employmentPosition)
    } catch (error) {
        return res.status(500).json({error, message: "Failed to get Position"})
    }
})

// get all positions for an association
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
        const employmentPositions = await db.employmentPosition.findMany({
            where: {
                associationId: id
            }
        })
        return res.status(201).json(employmentPositions)
    } catch (error) {
        return res.status(500).json({error, message: "Failed to get Positions"})
    }
})


export default router