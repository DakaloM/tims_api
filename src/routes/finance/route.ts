import db from "../../config/connection";
import express, { Response, Request } from "express";
import validate from "../../middleware/validateResource";
import { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization } from "../../middleware/verifyToken";
import { findAssociation } from "../../validation/association";
import { updateVehicleSchema, vehicleSchema } from "../../schema/vehicle.schema";
import { duplicateRegNumber } from "../../validation/vehicle";
import { financeSchema, updateFinanceSchema } from "../../schema/finance.schema";
import { duplicateVehicle } from "../../validation/finance";



const router = express.Router();

// Create a finance
router.post("/",verifyToken,validate(financeSchema),async (req: Request, res: Response) => {
    const {vehicleId, ...others} = req.body
    
    const vehicleExist = await duplicateVehicle(vehicleId);
    if(vehicleExist){
        return res.status(409).json({message: "Vehicle already has finance"})
    }

    // create
    try {
        await db.finance.create({
            data: {
                ...req.body,
            }
        })
        return res.status(201).json({message: "Finance added successfully"});
    } catch (error) {
        return res.status(500).json({error, message: "Failed to add new finance"});
    }
})

// update car finance
router.patch("/:id",verifyTokenAndAuthorization,validate(updateFinanceSchema),async (req: Request, res: Response) => {
    const id = req.params.id
    const finance = await db.finance.findUnique({
        where: {id: id}
    })
    if(!finance){
        return res.status(404).json({message: "Finance not found"})
    }

    // update
    try {

        await db.finance.update({
            where: {id: id},
            data: {
                ...req.body
            }
        })
        return res.status(200).json({message: "Finance updated successfully"})
    } catch (error) {
        return res.status(500).json({error, message: "Failed to update finance"})
    }
})

// delete a finance
router.delete("/:id",verifyTokenAndAuthorization,async (req: Request, res: Response) => {

    const id = req.params.id
    const finance = await db.finance.findUnique({
        where: {id: id}
    })

    if(!finance) {
        return res.status(404).json({message: "Finance not found"})
    }

    // delete finance
    try {
        await db.finance.delete({
            where:{id: id}
        })
        return res.status(201).json({message: "Finance deleted successfully"})
    } catch (error) {
        return res.status(500).json({error, message: "Failed to delete finance"})
    }
})

// get a finance
router.get("/:id", verifyToken, async (req: Request, res: Response) => {

    const id = req.params.id

    // get a finance
    try {
        const finance = await db.finance.findUnique({
            where:{id: id}
        })
        if(!finance) {
            return res.status(404).json({message: "Finance not found"})
        }
        return res.status(200).json(finance)
    } catch (error) {
        return res.status(500).json({error, message: "Failed to get finance"})
    }
})

// get all finances
router.get("/",async (req: Request, res: Response) => {

    // get all finances
    try {
        const finances = await db.finance.findMany()
        return res.status(201).json(finances)
    } catch (error) {
        return res.status(500).json({error, message: "Failed to retrieve finances"})
    }
})





export default router
