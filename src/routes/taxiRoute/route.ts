import db from "../../config/connection";
import express, { Response, Request } from "express";
import validate from "../../middleware/validateResource";
import { verifyTokenAndAdmin } from "../../middleware/verifyToken";
import { routeSchema, updateRouteSchema } from "../../schema/route.schema";
import { duplicateRouteName } from "../../validation/route";
import { findAssociation } from "../../validation/association";
import { validateUserId } from "../../validation/shared";



const router = express.Router();

// Create a route
router.post("/",verifyTokenAndAdmin,validate(routeSchema),async (req: Request, res: Response) => {
    const {name ,associationId, createdBy,  ...others} = req.body
    const nameExist = await duplicateRouteName(name, associationId);
    const association = await findAssociation(associationId);
    const userId = await validateUserId(createdBy);
    if(!userId) {
        return res.status(404).json({message: "Invalid User Id provided"})
    }
    if(!association) {
        return res.status(404).json({message: "Association id not found"})
    }
    if(nameExist) {
        return res.status(409).json({message: "Route with the same name already exist"});
    }

    // create route
    try {
        await db.route.create({
            data: {...req.body}
        })

        return res.status(201).json({message: "Route added successfully"});
    
    } catch (error) {
        return res.status(409).json({error, message: "Failed to add a new route"});
    }
    
})

// update route
router.patch("/:id",verifyTokenAndAdmin,validate(updateRouteSchema),async (req: Request, res: Response) => {
    const {updatedBy, ...others} = req.body
    const id = req.params.id

    const userId = await validateUserId(updatedBy);
    if(!userId) {
        return res.status(404).json({message: "Invalid User Id provided"})
    }
    

    const route = await db.route.findUnique({
        where: {id: id}
    })
    if(!route) {
        return res.status(404).json({message: "Route not found"});
    }

    

    try {
        await db.route.update({
            where: {id: id},
            data: {...req.body}
        })
        return res.status(200).json({message: "Route updated successfully"});
    } catch (error) {
        return res.status(500).json({error, message: "Failed to update route"});
    }
})
// delete route
router.delete("/:id",verifyTokenAndAdmin,async (req: Request, res: Response) => {
    const id = req.params.id

    const route = await db.route.findUnique({
        where: {id: id}
    })
    if(!route) {
        return res.status(404).json({message: "Route not found"});
    }

    try {
        await db.route.delete({
            where: {id: id}
        })
        return res.status(200).json({message: "Route deleted successfully"});
    } catch (error) {
        return res.status(500).json({message: "Failed to delete route"});
    }
})

// get a route
router.get("/:id",async (req: Request, res: Response) => {
    const id = req.params.id

    try {
        const routes = await db.route.findUnique({
            where: {id: id}
        })
        return res.status(200).json(routes);
    } catch (error) {
        return res.status(500).json({error, message: "Failed to retrieve a route"});
    }
})
// get all routes
router.get("/",async (req: Request, res: Response) => {

    try {
        const routes = await db.route.findMany()
        return res.status(200).json(routes);
    } catch (error) {
        return res.status(500).json({error, message: "Failed to retrieve a route"});
    }
})
// get all association routes
router.get("/association/:associationId",async (req: Request, res: Response) => {

    const id = req.params.associationId
    const association = await findAssociation(id);
    if(!association){
        return res.status(404).json({message: "Association not found"})
    }
    try {
        const routes = await db.route.findMany({
            where: {
                associationId: id
            }
        })
        return res.status(200).json(routes);
    } catch (error) {
        return res.status(500).json({error, message: "Failed to retrieve a route"});
    }
})



export default router;
