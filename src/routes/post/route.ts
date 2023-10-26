import db from "../../config/connection";
import express, { Response, Request } from "express";
import validate from "../../middleware/validateResource";
import { verifyTokenAndAdmin, verifyTokenAndSuperUser } from "../../middleware/verifyToken";
import { applicationSchema } from "../../schema/application.schema";
import { duplicateEmail } from "../../validation/application";
import { postSchema } from "../../schema/employmentPosition.schema";
import { updatePostSchema } from "../../schema/post.schema";



const router = express.Router();

// Create a post
router.post("/", verifyTokenAndAdmin,validate(postSchema),async (req: Request, res: Response) => {

    

    // create post
    try {
        await db.employmentPost.create({
            data: {...req.body}
        })
        return res.status(201).json({message: "Post added"})
    } catch (error) {
        return res.status(500).json({error, message: "Failed to create new post"})
    }
})

// edit employmentPost
router.patch("/:id",verifyTokenAndAdmin,validate(updatePostSchema),async (req: Request, res: Response) => {

    const id = req.params.id
    const employmentPost = await db.employmentPost.findUnique({
        where: {id: id}
    })

    if(!employmentPost) {
        return res.status(404).json({message: "employmentPost not found"})
    }

    // edit employmentPost
    try {
        await db.employmentPost.update({
            where:{id: id},
            data: {...req.body}
        })
        return res.status(201).json({message: "Post updated successfully"})
    } catch (error) {
        return res.status(500).json({error, message: "Failed to update Post"})
    }
})

// delete employmentPost
router.delete("/:id",verifyTokenAndSuperUser,async (req: Request, res: Response) => {

    const id = req.params.id
    const employmentPost = await db.employmentPost.findUnique({
        where: {id: id}
    })

    if(!employmentPost) {
        return res.status(404).json({message: "employmentPost not found"})
    }

    // delete employmentPost
    try {
        await db.employmentPost.delete({
            where:{id: id}
        })
        return res.status(201).json({message: "Post deleted successfully"})
    } catch (error) {
        return res.status(500).json({error, message: "Failed to delete post"})
    }
})

// get an employmentPost
router.get("/:id",async (req: Request, res: Response) => {

    const id = req.params.id

    // get an employmentPost
    try {
        const employmentPost = await db.employmentPost.findUnique({
            where:{id: id}
        })
        if(!employmentPost) {
            return res.status(404).json({message: "Post not found"})
        }
        return res.status(201).json(employmentPost)
    } catch (error) {
        return res.status(500).json({error, message: "Failed to get Post"})
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
    // get  employmentPost
    try {
        const employmentPost = await db.employmentPost.findMany({
            where: {
                associationId: id
            }
        })
        return res.status(201).json(employmentPost)
    } catch (error) {
        return res.status(500).json({error, message: "Failed to get applications"})
    }
})


export default router