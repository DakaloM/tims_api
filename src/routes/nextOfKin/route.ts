import db from "../../config/connection";
import express, { Response, Request } from "express";
import validate from "../../middleware/validateResource";
import {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
  verifyTokenAndDriver,
  verifyTokenAndMarshal,
  verifyTokenAndSuperUser,
} from "../../middleware/verifyToken";
import { passengerSchema } from "../../schema/passenger.schema";
import {
  createUser,
  duplicatePassengerEmail,
  duplicatePassengerID,
  duplicatePassengerPhone,
} from "../../validation/passenger";
import randomGenerator from "../../utils/randomGenerator";
import bcrypt from "bcrypt";
import { nextOfKinSchema, updateNextOfKinSchema } from "../../schema/nextOfKin.schema";

const router = express.Router();



// create Next of kin
router.post(
  "/",
  verifyToken, validate(nextOfKinSchema),
  async (req: Request, res: Response) => {
    
    // create 
    try {
      await db.nextOfKin.create({
        data: {
            ...req.body
        }
      });
      return res.status(200).json({ message: "Next of kin added successfully" });
    } catch (error) {
      return res
        .status(500)
        .json({ error, message: "Failed to add Next of kin" });
    }
  }
);
// Edit NextOfKin
router.patch(
  "/:id",
  verifyTokenAndAuthorization, validate(updateNextOfKinSchema),
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const nextOfKin = await db.nextOfKin.findUnique({
      where: { id: id },
    });

    if (!nextOfKin) {
      return res.status(404).json({ message: "nextOfKin not found" });
    }

    // update nextOfKin
    try {
      await db.nextOfKin.update({
        where: { id: id },
        data: {...req.body}
      });
      return res
        .status(200)
        .json({ message: "nextOfKin deleted successfully" });
    } catch (error) {
      return res
        .status(500)
        .json({ error, message: "Failed to delete nextOfKin" });
    }
  }
);
// delete NextOfKin
router.delete(
  "/:id",
  verifyTokenAndSuperUser,
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const nextOfKin = await db.nextOfKin.findUnique({
      where: { id: id },
    });

    if (!nextOfKin) {
      return res.status(404).json({ message: "nextOfKin not found" });
    }

    // delete nextOfKin
    try {
      await db.nextOfKin.delete({
        where: { id: id },
      });
      return res
        .status(200)
        .json({ message: "nextOfKin deleted successfully" });
    } catch (error) {
      return res
        .status(500)
        .json({ error, message: "Failed to delete nextOfKin" });
    }
  }
);

// get single nextOfKin
router.get("/:id", verifyTokenAndAuthorization,
  async (req: Request, res: Response) => {
    const id = req.params.id;

    // get nextOfKin
    try {
      const nextOfKin = await db.nextOfKin.findUnique({
        where: { id: id },
      });
      if (!nextOfKin) {
        return res.status(404).json({ message: "nextOfKin not found" });
      }
      return res.status(200).json(nextOfKin);
    } catch (error) {
      return res.status(500).json({ error, message: "Failed to get nextOfKin" });
    }
  }
);

// get all nextOfKin for a user
router.get(
  "/user/:userId",
  verifyTokenAndAdmin,
  async (req: Request, res: Response) => {
    const id = req.params.associationId;
    // check if the association exists
    const user = await db.user.findUnique({
        where: {
            id: id
        }
    })

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // get  next of kin
    try {
      const nestOfKin = await db.nextOfKin.findMany({
        where: {
          userId: id,
        },
      });
      return res.status(201).json(nestOfKin);
    } catch (error) {
      return res
        .status(500)
        .json({ error, message: "Failed to get Next of kin" });
    }
  }
);

// get all nextOfKin for an association
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
      // get  next of kin
      try {
        const nextOfKin = await db.nextOfKin.findMany({
          where: {
            associationId: id,
          },
        });
        return res.status(201).json(nextOfKin);
      } catch (error) {
        return res
          .status(500)
          .json({ error, message: "Failed to get nextOfKin" });
      }
    }
  );
// get all nextOfKin 
router.get(
    "/",
    verifyTokenAndAdmin,
    async (req: Request, res: Response) => {
      
      // get  next of kin
      try {
        const nextOfKin = await db.nextOfKin.findMany();
        return res.status(201).json(nextOfKin);
      } catch (error) {
        return res
          .status(500)
          .json({ error, message: "Failed to get nextOfKin" });
      }
    }
  );

export default router;
