import db from "../../config/connection";
import express, { Response, Request } from "express";
import validate from "../../middleware/validateResource";
import { verifyTokenAndAdmin, verifyTokenAndAuthorization, verifyTokenAndDriver, verifyTokenAndMarshal, verifyTokenAndOwner, verifyTokenAndSuperUser } from "../../middleware/verifyToken";
import { duplicateRankAddress, duplicateRankName } from "../../validation/rank";
import { tripSchema, updateTripSchema } from "../../schema/trip.schema";
import { vehicleTripStatus } from "../../validation/trip";



const router = express.Router();

// initiate a trip
router.post("/initiate",verifyTokenAndDriver || verifyTokenAndMarshal, validate(tripSchema),async (req: Request, res: Response) => {

    const {vehicleId,...others} = req.body;
    // vehicle on trip?
    const vehicleOnTrip = await vehicleTripStatus(vehicleId);
    if(vehicleOnTrip) {
        return res.status(409).json({message: "vehicle already on trip"})
    }
    

    // initiate a trip
    try {
        const {status, ...others} = req.body
        await db.trip.create({
            data: {
                ...others,
                status: "INITIATED"
            }
        })
        return res.status(201).json({message: "Trip initiated successfully"})
    } catch (error) {
        return res.status(500).json({error, message: "Failed to initiate a trip"})
    }
})
//  start initiated trip
router.patch("/:id/start",verifyTokenAndDriver || verifyTokenAndMarshal,async (req: Request, res: Response) => {

    const id = req.params.id
    //Find the trip?
    const trip = await db.trip.findUnique({
        where:{id: id}
    })
    if(!trip) {
        return res.status(409).json({message: "Trip not found"})
    }
    
    // start a trip
    try {
        
        await db.trip.update({
            where: {
                id: id
            },
            data: {
                
                status: "ON_ROUTE",
                departureTime: Date.now().toLocaleString()
            }
        })
        return res.status(201).json({message: "Trip created successfully"})
    } catch (error) {
        return res.status(500).json({error, message: "Failed to create a trip"})
    }
})
// create and start  a trip
router.post("/",verifyTokenAndDriver || verifyTokenAndMarshal, validate(tripSchema),async (req: Request, res: Response) => {

    const {vehicleId,...others} = req.body;
    // vehicle on trip?
    const vehicleOnTrip = await vehicleTripStatus(vehicleId);
    if(vehicleOnTrip) {
        return res.status(409).json({message: "vehicle already on trip"})
    }
    
    // create a trip
    try {
        const {status, ...others} = req.body
        await db.trip.create({
            data: {
                ...others,
                status: "ON_ROUTE",
                departureTime: Date.now().toLocaleString()
            }
        })
        return res.status(201).json({message: "Trip created successfully"})
    } catch (error) {
        return res.status(500).json({error, message: "Failed to create a trip"})
    }
})

// complete a trip
router.patch("/:id",verifyTokenAndDriver,async (req: Request, res: Response) => {

    const id = req.params.id
    //Find the trip?
    const trip = await db.trip.findUnique({
        where:{id: id}
    })
    if(!trip) {
        return res.status(409).json({message: "Trip not found"})
    }

    // complete a trip
    try {
        await db.trip.update({
            where:{id: id},
            data: {
                status: "COMPLETE",
                arrivalTime: Date.now().toLocaleString()
            }
        })
        return res.status(201).json({message: "Trip completed successfully"})
    } catch (error) {
        return res.status(500).json({error, message: "Failed to complete a trip"})
    }
})

// delete a trip
router.delete("/:id",verifyTokenAndSuperUser,async (req: Request, res: Response) => {

    const id = req.params.id
    //Find the trip?
    const trip = await db.trip.findUnique({
        where:{id: id}
    })
    if(!trip) {
        return res.status(409).json({message: "Trip not found"})
    }

    // delete trip
    try {
        await db.trip.delete({
            where:{id: id}
        })
        return res.status(201).json({message: "Trip deleted successfully"})
    } catch (error) {
        return res.status(500).json({error, message: "Failed to delete trip"})
    }
})

// get a trip
router.get("/:id",verifyTokenAndDriver || verifyTokenAndOwner,async (req: Request, res: Response) => {

    const id = req.params.id

    // get a trip
    try {
        const trip = await db.trip.findUnique({
            where:{id: id}
        })
        if(!trip) {
            return res.status(404).json({message: "trip not found"})
        }
        return res.status(201).json(trip)
    } catch (error) {
        return res.status(500).json({error, message: "Failed to get trip"})
    }
})

// get all trips for a vehicle
router.get("/vehicle/vehicleId",verifyTokenAndOwner || verifyTokenAndAuthorization, async (req: Request, res: Response) => {
    const id = req.params.vehicleId
    //Find the vehicle?
    const vehicle = await db.vehicle.findUnique({
        where:{id: id}
    })
    if(!vehicle) {
        return res.status(409).json({message: "vehicle not found"})
    }
    // get  trips
    try {
        const trips = await db.trip.findMany({
            where: {
                vehicleId: id
            }
        })
        return res.status(201).json(trips)
    } catch (error) {
        return res.status(500).json({error, message: "Failed to get trips"})
    }
})

// get all trips
router.get("/", verifyTokenAndAdmin,async (req: Request, res: Response) => {

    
    // get all trips
    try {
        const trips = await db.trip.findMany()
        return res.status(201).json(trips)
    } catch (error) {
        return res.status(500).json({error, message: "Failed to get trips"})
    }
})
// get all trips for an association
router.get("/association/:associationId", verifyTokenAndAdmin,async (req: Request, res: Response) => {

    const id = req.params.associationId
    // check if the association exists
    const association = await db.association.findUnique({
        where: {id : id}
    })
    if(!association) {
        return res.status(404).json({message: "Association not found"})
    }
    // get  trips
    try {
        const trips = await db.trip.findMany({
            where: {
                associationId: id
            }
        })
        return res.status(201).json(trips)
    } catch (error) {
        return res.status(500).json({error, message: "Failed to get trips"})
    }
})


export default router