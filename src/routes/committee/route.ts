import db from "../../config/connection";
import express, { Response, Request } from "express";
import validate from "../../middleware/validateResource";
import { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization, verifyTokenAndSuperUser } from "../../middleware/verifyToken";
import { findAssociation } from "../../validation/association";
import { updateVehicleSchema, vehicleSchema } from "../../schema/vehicle.schema";
import { duplicateRegNumber } from "../../validation/vehicle";
import { financeSchema, updateFinanceSchema } from "../../schema/finance.schema";
import { duplicateVehicle } from "../../validation/finance";
import { duplicateName } from "../../validation/committee";
import { committeeSchema } from "../../schema/committee.schema";
import { validateUserId } from "../../validation/shared";



const router = express.Router();

// Create a committee
router.post("/",verifyTokenAndAdmin,validate(committeeSchema),async (req: Request, res: Response) => {
    const {name, associationId} = req.body
    
    const nameExist = await duplicateName(name, associationId);
    if(nameExist){
        return res.status(409).json({message: "committee name already has finance"})
    }

    // create
    try {
        await db.committee.create({
            data: {
                ...req.body,
            }
        })
        return res.status(201).json({message: "committee added successfully"});
    } catch (error) {
        return res.status(500).json({error, message: "Failed to add new committee"});
    }
})

// update car committee
router.patch("/:id",verifyTokenAndAdmin,validate(updateFinanceSchema),async (req: Request, res: Response) => {
    const id = req.params.id
    const committee = await db.committee.findUnique({
        where: {id: id}
    })
    if(!committee){
        return res.status(404).json({message: "committee not found"})
    }

    // update
    try {

        await db.committee.update({
            where: {id: id},
            data: {
                ...req.body
            }
        })
        return res.status(200).json({message: "committee updated successfully"})
    } catch (error) {
        return res.status(500).json({error, message: "Failed to update committee"})
    }
})

// delete a committee
router.delete("/:id",verifyTokenAndSuperUser,async (req: Request, res: Response) => {

    const id = req.params.id
    const userId = req.user.id
    const user = await validateUserId(userId);
    if(!user) {
        return res.status(404).json({message: "UserId not found"})
    }
    const committee = await db.committee.findUnique({
        where: {id: id}
    })
    

    if(!committee) {
        return res.status(404).json({message: "committee not found"})
    }

    // delete committee
    try {
        await db.committee.delete({
            where:{id: id}
        })
        return res.status(201).json({message: "committee deleted successfully"})
    } catch (error) {
        return res.status(500).json({error, message: "Failed to delete committee"})
    }
})

// get a committee
router.get("/:id", verifyTokenAndAdmin, async (req: Request, res: Response) => {

    const id = req.params.id

    // get a finance
    try {
        const committee = await db.committee.findUnique({
            where:{id: id}
        })
        if(!committee) {
            return res.status(404).json({message: "committee not found"})
        }
        return res.status(200).json(committee)
    } catch (error) {
        return res.status(500).json({error, message: "Failed to get committee"})
    }
})

// get all committees
router.get("/", verifyTokenAndAdmin,async (req: Request, res: Response) => {

    // get all finances
    try {
        const committee = await db.committee.findMany()
        return res.status(201).json(committee)
    } catch (error) {
        return res.status(500).json({error, message: "Failed to retrieve committee"})
    }
})

// get all committees for an association
router.get(
    "/association/:associationId",
    verifyTokenAndAdmin,
    async (req: Request, res: Response) => {
      const id = req.params.associationId;
      // check if the association exists
      const association = await db.association.findUnique({
        where: { id: id },
      });
      if (!association) {
        return res.status(404).json({ message: "Association not found" });
      }
      // get  committees
      try {
        const committees = await db.committee.findMany({
          where: {
            associationId: id,
          },
        });
        return res.status(201).json(committees);
      } catch (error) {
        return res
          .status(500)
          .json({ error, message: "Failed to get committees" });
      }
    }
  );





export default router
