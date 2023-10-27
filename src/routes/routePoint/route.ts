import db from "../../config/connection";
import express, { Response, Request } from "express";
import validate from "../../middleware/validateResource";
import { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization } from "../../middleware/verifyToken";
import { routePointSchema, updateRoutePointSchema } from "../../schema/routePoint.schema";
import { validateRouteId, validateUserId } from "../../validation/shared";



const router = express.Router();

// Create a routePoint
router.post("/",verifyTokenAndAdmin,validate(routePointSchema),async (req: Request, res: Response) => {
 
    const {routeId, createdBy, ...others} = req.body
    const route = await validateRouteId(routeId);
    if(!route){
        return res.status(404).json({message: "Route not found"});
    }

    const user = await validateUserId(createdBy);
    if(!user){
        return res.status(404).json({message: "User not found"});
    }
    // create
    try {
        if (req.body.rank === "true"){
            req.body.rank = Boolean(true)
        } else {
            req.body.rank = Boolean(false)
        }
    
        await db.routePoint.create({
            data: {
                ...req.body,
            }
        })
        return res.status(201).json({message: "Route stop added successfully"});
    } catch (error) {
        return res.status(500).json({error, message: "Failed to add new route stop"});
    }
})

// update routePoint
router.patch("/:id",verifyTokenAndAdmin,validate(updateRoutePointSchema),async (req: Request, res: Response) => {
    const id = req.params.id
    const routePoint = await db.routePoint.findUnique({
        where: {id: id}
    })
    if(!routePoint){
        return res.status(404).json({message: "Route point not found"})
    }

    // update
    try {

        await db.routePoint.update({
            where: {id: id},
            data: {
                ...req.body
            }
        })
        return res.status(200).json({message: "Route point updated successfully"})
    } catch (error) {
        return res.status(500).json({error, message: "Failed to update route point"})
    }
})

// delete a routePoint
router.delete("/:id",verifyTokenAndAdmin,async (req: Request, res: Response) => {

    const id = req.params.id
    const routePoint = await db.routePoint.findUnique({
        where: {id: id}
    })

    if(!routePoint) {
        return res.status(404).json({message: "Route point not found"})
    }

    // delete routePoint
    try {
        await db.routePoint.delete({
            where:{id: id}
        })
        return res.status(201).json({message: "Route point deleted successfully"})
    } catch (error) {
        return res.status(500).json({error, message: "Failed to delete route point"})
    }
})

// get a routePoint
router.get("/:id", async (req: Request, res: Response) => {

    const id = req.params.id

    // get a routePoint
    try {
        const routePoint = await db.routePoint.findUnique({
            where:{id: id}
        })
        if(!routePoint) {
            return res.status(404).json({message: "Route point not found"})
        }
        return res.status(200).json(routePoint)
    } catch (error) {
        return res.status(500).json({error, message: "Failed to get route point"})
    }
})

// get all routePoints for a route
router.get("/route/:routeId" ,async (req: Request, res: Response) => {
    const id = req.params.routeId
    // check if the route exists
    const route = await db.route.findUnique({
        where: {id: id}
    });
    if(!route) {
        return res.status(404).json({message: "Route not found"});
    }
    // get all routePoints
    try {
        const routePoints = await db.routePoint.findMany({
            where: {
                routeId: id
            }
        });
        return res.status(200).json(routePoints)
    } catch (error) {
        return res.status(500).json({error, message: "Failed to retrieve route points"})
    }
})





export default router
