import db from "../../config/connection";
import express, { Response, Request } from "express";
import validate from "../../middleware/validateResource";
import { verifyToken, verifyTokenAndAdmin, verifyTokenAndSuperUser } from "../../middleware/verifyToken";
import { routeSchema, updateRouteSchema } from "../../schema/route.schema";
import { duplicateRouteName } from "../../validation/route";
import { findAssociation } from "../../validation/association";
import { feeSchema } from "../../schema/application.schema";
import { duplicateFee } from "../../validation/fee";
import { updateFeeSchema } from "../../schema/fee.schema";



const router = express.Router();

// Create a fee
router.post("/",verifyTokenAndAdmin,validate(feeSchema),async (req: Request, res: Response) => {
    const {type ,userId, status, associationId,  ...others} = req.body
    const props = {type ,userId, status, associationId}
    const feeExist = await duplicateFee(props);
    if(feeExist) {
        return res.status(409).json({message: "A fee for the same purpose already exist for the user"});
    }

    // create fee
    try {
        await db.fee.create({
            data: {...req.body}
        })

        return res.status(201).json({message: "fee added successfully"});
    
    } catch (error) {
        return res.status(409).json({error, message: "Failed to add a  fee"});
    }
    
})

// update fee
router.patch("/:id",verifyTokenAndAdmin,validate(updateFeeSchema),async (req: Request, res: Response) => {
    const id = req.params.id

    const fee = await db.fee.findUnique({
        where: {id: id}
    })
    if(!fee) {
        return res.status(404).json({message: "fee not found"});
    }

    try {
        await db.fee.update({
            where: {id: id},
            data: {...req.body}
        })
        return res.status(200).json({message: "fee updated successfully"});
    } catch (error) {
        return res.status(500).json({message: "Failed to update fee"});
    }
})
// delete fee
router.delete("/:id",verifyTokenAndSuperUser,async (req: Request, res: Response) => {
    const id = req.params.id

    const fee = await db.fee.findUnique({
        where: {id: id}
    })
    if(!fee) {
        return res.status(404).json({message: "fee not found"});
    }

    try {
        await db.fee.delete({
            where: {id: id}
        })
        return res.status(200).json({message: "fee deleted successfully"});
    } catch (error) {
        return res.status(500).json({message: "Failed to delete fee"});
    }
})

// get a fee
router.get("/:id", verifyToken,async (req: Request, res: Response) => {
    const id = req.params.id

    try {
        const fee = await db.fee.findUnique({
            where: {id: id}
        })
        return res.status(200).json(fee);
    } catch (error) {
        return res.status(500).json({error, message: "Failed to retrieve a fee"});
    }
})
// get all fees for a user
router.get("/user/:userId",async (req: Request, res: Response) => {
    const id = req.params.userId
    const user = await db.user.findUnique({
        where: {
            id: id
        }
    });
    if(!user) {
        return res.status(404).json({message: "User not found"})
    }

    // get all fees
    try {
        const fees = await db.fee.findMany()
        return res.status(200).json(fees);
    } catch (error) {
        return res.status(500).json({error, message: "Failed to retrieve fees"});
    }
})
// get all association fees
router.get("/association/:associationId",verifyTokenAndAdmin,async (req: Request, res: Response) => {

    const id = req.params.associationId
    const association = await findAssociation(id);
    if(!association){
        return res.status(404).json({message: "Association not found"})
    }
    // get fees
    try {
        const fees = await db.fee.findMany({
            where: {
                associationId: id
            }
        })
        return res.status(200).json(fees);
    } catch (error) {
        return res.status(500).json({error, message: "Failed to retrieve fees"});
    }
})



export default router;
