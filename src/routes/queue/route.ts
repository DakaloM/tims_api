import db from "../../config/connection";
import express, { Response, Request } from "express";
import validate from "../../middleware/validateResource";
import { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization, verifyTokenAndMarshal, verifyTokenAndSuperUser } from "../../middleware/verifyToken";
import { queueSchema } from "../../schema/queue.schema";
import { queueVehicleSchema } from "../../schema/queueVehicle.schema";
import { validateRankId, validateRouteId, validateUserId, validateVehicleId } from "../../validation/shared";



const router = express.Router();

// Create a queue
router.post("/",verifyTokenAndMarshal ,validate(queueSchema),async (req: Request, res: Response) => {
    
    const {rankId, routeId, marshalId, createdBy, ...others} = req.body
    const rank = await validateRankId(rankId);

    if(!rank) {
        return res.status(404).json({message: "Rank not found"})
    }

    const route = await validateRouteId(routeId)
    if(!route) {
        return res.status(404).json({message: "Route not found"})
    }

    const user = await validateUserId(marshalId);
    if(!user) {
        return res.status(404).json({message: "Marshal not found"})
    }

    const queue = await db.queue.findUnique({
        where: {
            routeId: routeId
        }
    })

    if(queue) {
        return res.status(409).json({message: "This route already have a queue"})
    }

    // create
    try {
        await db.queue.create({
            data: {
                ...req.body,
            }
        })
        return res.status(201).json({message: "Queue added successfully"});
    } catch (error) {
        return res.status(500).json({error, message: "Failed to add new queue"});
    }
})

// add departed vehicle 
router.patch("/:id/addDeparted",verifyTokenAndMarshal,validate(queueVehicleSchema),async (req: Request, res: Response) => {
    const {vehicleId, driver} = req.body
    const id = req.params.id

    const vehicle = await validateVehicleId(vehicleId)
    if(!vehicle) {
        return res.status(404).json({message: "Vehicle not found"})
    }
    const queue = await db.queue.findUnique({
        where: {id: id}
    })
    if(!queue){
        return res.status(404).json({message: "Queue not found"})
    }

    // update
    try {
    
        await db.queue.update({
            where: {id: id},
            data: {
                departedVehicles: [...queue.departedVehicles + {...req.body}]
            }
        })
        return res.status(200).json({message: "Queue updated successfully"})
    } catch (error) {
        return res.status(500).json({error, message: "Failed to update queue"})
    }
})

// delete a queue
router.delete("/:id",verifyTokenAndAdmin,async (req: Request, res: Response) => {

    const id = req.params.id
    const queue = await db.queue.findUnique({
        where: {id: id}
    })

    if(!queue) {
        return res.status(404).json({message: "Queue not found"})
    }

    // delete queue
    try {
        await db.queue.delete({
            where:{id: id}
        })
        return res.status(200).json({message: "Queue deleted successfully"})
    } catch (error) {
        return res.status(500).json({error, message: "Failed to delete queue"})
    }
})

// get a queue
router.get("/:id",verifyToken , async (req: Request, res: Response) => {

    const id = req.params.id

    // get a queue
    try {
        const queue = await db.queue.findUnique({
            where:{id: id}
        })
        if(!queue) {
            return res.status(404).json({message: "Queue not found"})
        }
        return res.status(200).json(queue)
    } catch (error) {
        return res.status(500).json({error, message: "Failed to get queue"})
    }
})

// get all queues for a route
router.get("/route/:routeId" , verifyTokenAndAdmin,async (req: Request, res: Response) => {
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
        const queues = await db.queue.findMany({
            where: {
                routeId: id
            }
        });
        return res.status(200).json(queues)
    } catch (error) {
        return res.status(500).json({error, message: "Failed to retrieve queues"})
    }
})

// get all queues for a rank
router.get("/rank/:rankId" , verifyTokenAndAdmin,async (req: Request, res: Response) => {
    const id = req.params.rankId
    // check if the rank exists
    const rank = await db.rank.findUnique({
        where: {id: id}
    });
    if(!rank) {
        return res.status(404).json({message: "Rank not found"});
    }
    // get all queues
    try {
        const queues = await db.queue.findMany({
            where: {
                rankId: id
            }
        });
        return res.status(200).json(queues)
    } catch (error) {
        return res.status(500).json({error, message: "Failed to retrieve queues"})
    }
})





export default router
