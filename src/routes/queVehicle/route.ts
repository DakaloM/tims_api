import db from "../../config/connection";
import express, { Response, Request } from "express";
import validate from "../../middleware/validateResource";
import { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization, verifyTokenAndDriver, verifyTokenAndMarshal } from "../../middleware/verifyToken";
import { queueVehicleSchema, updateQueueVehicleSchema } from "../../schema/queueVehicle.schema";
import { duplicateVehicleInQueue } from "../../validation/queueVehicle";
import { gt } from "lodash";



const router = express.Router();

// Adding vehicle into a queue
router.post("/",verifyTokenAndMarshal,validate(queueVehicleSchema),async (req: Request, res: Response) => {
    const {vehicleId, ...others} = req.body
    const duplicateVehicle = await duplicateVehicleInQueue(vehicleId);
    if(duplicateVehicle) {
        return res.status(409).json({message: "Vehicle is already in the queue"})
    }
    // create
    try {
        await db.queueVehicle.create({
            data: {
                ...req.body,
            }
        })
        return res.status(201).json({message: "vehicle added successfully"});
    } catch (error) {
        return res.status(500).json({error, message: "Failed to add new vehicle"});
    }
})

// update vehicle
router.patch("/:id",verifyTokenAndMarshal,validate(updateQueueVehicleSchema),async (req: Request, res: Response) => {
    const id = req.params.id
    const queueVehicle = await db.queueVehicle.findUnique({
        where: {id: id}
    })
    if(!queueVehicle){
        return res.status(404).json({message: "Vehicle not found"})
    }

    // update
    try {

        await db.queueVehicle.update({
            where: {id: id},
            data: {
                ...req.body
            }
        })
        return res.status(200).json({message: "Vehicle updated successfully"})
    } catch (error) {
        return res.status(500).json({error, message: "Failed to update vehicle"})
    }
})

// remove vehicle from queue
router.delete("/:id",verifyTokenAndMarshal,async (req: Request, res: Response) => {

    const id = req.params.id
    const queueVehicle = await db.queueVehicle.findUnique({
        where: {id: id}
    })

    if(!queueVehicle) {
        return res.status(404).json({message: "Vehicle not found"})
    }

    // delete vehicle
    try {
        await db.queueVehicle.delete({
            where:{id: id}
        })
        return res.status(200).json({message: "Vehicle removed successfully"})
    } catch (error) {
        return res.status(500).json({error, message: "Failed to remove vehicle"})
    }
})

// get a queue vehicle
router.get("/:id",verifyTokenAndMarshal , async (req: Request, res: Response) => {

    const id = req.params.id

    // get a queue vehicle
    try {
        const queueVehicle = await db.queueVehicle.findUnique({
            where:{id: id}
        })
        if(!queueVehicle) {
            return res.status(404).json({message: "vehicle not found"})
        }
        return res.status(200).json(queueVehicle)
    } catch (error) {
        return res.status(500).json({error, message: "Failed to get vehicle"})
    }
})

// get all vehicles for a queue
router.get("/queue/:queueId" , verifyTokenAndAdmin,async (req: Request, res: Response) => {
    const id = req.params.queueId
    // check if the queue exists
    const queue = await db.queue.findUnique({
        where: {id: id}
    });
    if(!queue) {
        return res.status(404).json({message: "Queue not found"});
    }
    // get all vehicles
    try {
        const queueVehicles = await db.queueVehicle.findMany({
            where: {
                queueId: id
            }
        });
        return res.status(200).json(queueVehicles)
    } catch (error) {
        return res.status(500).json({error, message: "Failed to retrieve queueVehicles"})
    }
})

// update queue numbers
router.patch("/queueNumbers" , verifyTokenAndMarshal || verifyTokenAndDriver,async (req: Request, res: Response) => {
    const id = req.params.rankId
    
    // update all vehicles inside a queue
    try {
         await db.queueVehicle.updateMany({
            where: {
                queueNumber: {
                    gt: 1
                },
            },
            data: {
                queueNumber:{
                    decrement: 1
                }
            }
        });
        return res.status(200).json({message: "queue vehicles updated"})
    } catch (error) {
        return res.status(500).json({error, message: "Failed to update queue vehicles"})
    }
})





export default router
