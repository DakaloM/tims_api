import db from "../../config/connection";
import express, { Response, Request } from "express";
import validate from "../../middleware/validateResource";
import { verifyToken, verifyTokenAndAdmin, verifyTokenAndDriver, verifyTokenAndOwner, verifyTokenAndSuperUser } from "../../middleware/verifyToken";
import { findAssociation } from "../../validation/association";
import { feeSchema } from "../../schema/application.schema";
import { duplicateFee } from "../../validation/fee";
import { updateFeeSchema } from "../../schema/fee.schema";



const router = express.Router();

// Create a vehicle income
router.post("/",verifyTokenAndDriver || verifyTokenAndOwner,validate(feeSchema),async (req: Request, res: Response) => {

    // create income
    try {
        await db.vehicleIncome.create({
            data: {...req.body}
        })

        return res.status(201).json({message: "vehicleIncome added successfully"});
    
    } catch (error) {
        return res.status(409).json({error, message: "Failed to add a  vehicleIncome"});
    }
    
})

// update vehicleIncome
router.patch("/:id",verifyTokenAndDriver || verifyTokenAndOwner,validate(updateFeeSchema),async (req: Request, res: Response) => {
    const id = req.params.id

    const vehicleIncome = await db.vehicleIncome.findUnique({
        where: {id: id}
    })
    if(!vehicleIncome) {
        return res.status(404).json({message: "vehicleIncome not found"});
    }

    try {
        await db.vehicleIncome.update({
            where: {id: id},
            data: {...req.body}
        })
        return res.status(200).json({message: "vehicleIncome updated successfully"});
    } catch (error) {
        return res.status(500).json({message: "Failed to update vehicleIncome"});
    }
})
// delete vehicleIncome
router.delete("/:id",verifyTokenAndOwner|| verifyTokenAndSuperUser,async (req: Request, res: Response) => {
    const id = req.params.id

    const vehicleIncome = await db.vehicleIncome.findUnique({
        where: {id: id}
    })
    if(!vehicleIncome) {
        return res.status(404).json({message: "vehicleIncome not found"});
    }

    try {
        await db.vehicleIncome.delete({
            where: {id: id}
        })
        return res.status(200).json({message: "vehicleIncome deleted successfully"});
    } catch (error) {
        return res.status(500).json({message: "Failed to delete vehicleIncome"});
    }
})

// get a vehicleIncome
router.get("/:id", verifyTokenAndAdmin || verifyTokenAndDriver || verifyTokenAndOwner,async (req: Request, res: Response) => {
    const id = req.params.id

    try {
        const vehicleIncome = await db.vehicleIncome.findUnique({
            where: {id: id}
        })
        return res.status(200).json(vehicleIncome);
    } catch (error) {
        return res.status(500).json({error, message: "Failed to retrieve a vehicleIncome"});
    }
})
// get all income for a vehicle
router.get("/vehicle/:vehicleId",async (req: Request, res: Response) => {
    const id = req.params.userId
    const vehicle = await db.vehicle.findUnique({
        where: {
            id: id
        }
    });
    if(!vehicle) {
        return res.status(404).json({message: "vehicle not found"})
    }

    // get all fees
    try {
        const vehicleIncomes = await db.vehicleIncome.findMany()
        return res.status(200).json(vehicleIncomes);
    } catch (error) {
        return res.status(500).json({error, message: "Failed to retrieve vehicleIncomes"});
    }
})




export default router;
