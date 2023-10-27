import db from "../../config/connection";
import express, { Response, Request } from "express";
import validate from "../../middleware/validateResource";
import { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization, verifyTokenAndSuperAccount } from "../../middleware/verifyToken";

import { duplicateVehicle } from "../../validation/insurance";
import { insuranceSchema, updateInsuranceSchema } from "../../schema/insurance.schema";
import { validateVehicleId } from "../../validation/shared";
import { dateStringToIso } from "../../utils/methods";



const router = express.Router();

// Create a insurance
router.post("/",verifyToken,validate(insuranceSchema),async (req: Request, res: Response) => {
    const {vehicleId, ...others} = req.body
    const vehicle = await validateVehicleId(vehicleId)
    if(!vehicle){
        return res.status(409).json({message: "Vehicle not found"})
    }
    const vehicleExist = await duplicateVehicle(vehicleId);
    if(vehicleExist){
        return res.status(409).json({message: "Vehicle already insured"})
    }

    // create
    try {
        req.body.startDate = dateStringToIso(req.body.startDate);
        await db.insurance.create({
            data: {
                ...req.body,
            }
        })
        return res.status(201).json({message: "Insurance added successfully"});
    } catch (error) {
        return res.status(500).json({error, message: "Failed to add new insurance"});
    }
})

// update car insurance
router.patch("/:id",verifyTokenAndAuthorization,validate(updateInsuranceSchema),async (req: Request, res: Response) => {
    const id = req.params.id
    const insurance = await db.insurance.findUnique({
        where: {id: id}
    })
    if(!insurance){
        return res.status(404).json({message: "Insurance not found"})
    }

    // update
    try {

        await db.insurance.update({
            where: {id: id},
            data: {
                ...req.body
            }
        })
        return res.status(200).json({message: "Insurance updated successfully"})
    } catch (error) {
        return res.status(500).json({error, message: "Failed to update insurance"})
    }
})

// delete a insurance
router.delete("/:id",verifyTokenAndAuthorization,async (req: Request, res: Response) => {

    const id = req.params.id
    const insurance = await db.insurance.findUnique({
        where: {id: id}
    })

    if(!insurance) {
        return res.status(404).json({message: "Insurance not found"})
    }

    // delete insurance
    try {
        await db.insurance.delete({
            where:{id: id}
        })
        return res.status(201).json({message: "Insurance deleted successfully"})
    } catch (error) {
        return res.status(500).json({error, message: "Failed to delete insurance"})
    }
})

// get a insurance
router.get("/:id", verifyToken, async (req: Request, res: Response) => {

    const id = req.params.id

    // get a insurance
    try {
        const insurance = await db.insurance.findUnique({
            where:{id: id}
        })
        if(!insurance) {
            return res.status(404).json({message: "Insurance not found"})
        }
        return res.status(200).json(insurance)
    } catch (error) {
        return res.status(500).json({error, message: "Failed to get insurance"})
    }
})

// get all insurances
router.get("/",verifyTokenAndSuperAccount ,async (req: Request, res: Response) => {

    // get all insurance
    try {
        const insurances = await db.insurance.findMany()
        return res.status(201).json(insurances)
    } catch (error) {
        return res.status(500).json({error, message: "Failed to retrieve insurances"})
    }
})





export default router
