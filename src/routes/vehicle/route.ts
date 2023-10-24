import db from "../../config/connection";
import express, { Response, Request } from "express";
import validate from "../../middleware/validateResource";
import { verifyToken, verifyTokenAndAdmin } from "../../middleware/verifyToken";
import { findAssociation } from "../../validation/association";
import { updateVehicleSchema, vehicleSchema } from "../../schema/vehicle.schema";
import { duplicateRegNumber } from "../../validation/vehicle";



const router = express.Router();

// Create a vehicle
router.post("/",verifyTokenAndAdmin,validate(vehicleSchema),async (req: Request, res: Response) => {
    const {registrationNumber, ...others} = req.body
    
    const duplicateRegistration = await duplicateRegNumber(registrationNumber);
    if(duplicateRegistration){
        return res.status(409).json({message: "Car registration number already exist"})
    }

    // create
    try {
        await db.vehicle.create({
            data: {
                ...req.body,
            }
        })
        return res.status(201).json({message: "Vehicle added successfully"});
    } catch (error) {
        return res.status(500).json({error, message: "Failed to add new vehicle"});
    }
})

// update a vehicle
router.patch("/:id",verifyTokenAndAdmin,validate(updateVehicleSchema),async (req: Request, res: Response) => {
    const id = req.params.id
    const vehicle = await db.vehicle.findUnique({
        where: {id: id}
    })
    if(!vehicle){
        return res.status(404).json({message: "Vehicle not found"})
    }

    // update
    try {

        await db.vehicle.update({
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

// delete a vehicle
router.delete("/:id",verifyTokenAndAdmin,async (req: Request, res: Response) => {

    const id = req.params.id
    const vehicle = await db.vehicle.findUnique({
        where: {id: id}
    })

    if(!vehicle) {
        return res.status(404).json({message: "Vehicle not found"})
    }

    // delete vehicle
    try {
        await db.vehicle.delete({
            where:{id: id}
        })
        return res.status(201).json({message: "Vehicle deleted successfully"})
    } catch (error) {
        return res.status(500).json({error, message: "Failed to delete vehicle"})
    }
})

// get a vehicle
router.get("/:id", verifyToken, async (req: Request, res: Response) => {

    const id = req.params.id

    // get a license
    try {
        const vehicle = await db.vehicle.findUnique({
            where:{id: id}
        })
        if(!vehicle) {
            return res.status(404).json({message: "Vehicle not found"})
        }
        return res.status(201).json(vehicle)
    } catch (error) {
        return res.status(500).json({error, message: "Failed to get vehicle"})
    }
})

// get all vehicles
router.get("/",async (req: Request, res: Response) => {

    // get all license
    try {
        const vehicles = await db.vehicle.findMany()
        return res.status(201).json(vehicles)
    } catch (error) {
        return res.status(500).json({error, message: "Failed to retrieve vehicles"})
    }
})
// get all vehicles for an association
router.get("/association/:associationId",async (req: Request, res: Response) => {

    const id = req.params.associationId
    // check if the association exists
    const association = await findAssociation(id)
    if(!association) {
        return res.status(404).json({message: "Association not found"})
    }
    // get  vehicle
    try {
        const vehicles = await db.vehicle.findMany({
            where: {
                associationId: id
            }
        })
        return res.status(201).json(vehicles)
    } catch (error) {
        return res.status(500).json({error, message: "Failed to get vehicles"})
    }
})




export default router
