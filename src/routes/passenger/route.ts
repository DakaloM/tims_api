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
import { serializeObject } from "../../utils/serializer";

const router = express.Router();

// Create passenger
router.post(
  "/",
  verifyTokenAndMarshal || verifyTokenAndDriver,
  validate(passengerSchema),
  async (req: Request, res: Response) => {
    const { phone, email, SAID, ...others } = req.body;
    // create
    const emailExists = await duplicatePassengerEmail(email);
    const phoneExists = await duplicatePassengerPhone(phone);
    const IdExists = await duplicatePassengerID(SAID);

    if (emailExists || phoneExists || IdExists) {
      return res
        .status(409)
        .json({ message: "passenger already in the system" });
    }

    try {
      const passenger = await db.passenger.create({
        data: {
          ...req.body,
        },
      });

      if (!passenger) {
      }
      // create a user for the passenger

      const password = randomGenerator(4);
      //hashing password
      const saltRounds = 10;
      const hashedPassword = bcrypt.hashSync(password, saltRounds);

      try {
        const user = await db.user.create({
          data: {
            email: passenger.email ? passenger.email : "No email",
            SAID: passenger.SAID,
            phone: passenger.phone,
            firstName: passenger.firstName,
            lastName: passenger.lastName,
            associationId: passenger.associationId,
            role: "COMMUNITY",
            type: "COMMUNITY",
            createdBy: passenger.createdBy,
            password: hashedPassword,
            passengerId: passenger.id,
          },
        });

        // Send sms here with user information
      } catch (error) {
        return res.status(401).json({ message: "Failed to create user" });
      }

      return res.status(201).json({ message: "Passenger added successfully" });
    } catch (error) {
      return res
        .status(500)
        .json({ error, message: "Failed to add new Passenger" });
    }
  }
);

// delete a passenger
router.delete(
  "/:id",
  verifyTokenAndSuperUser,
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const passenger = await db.passenger.findUnique({
      where: { id: id },
    });

    if (!passenger) {
      return res.status(404).json({ message: "passenger not found" });
    }

    // delete passenger
    try {
      await db.passenger.delete({
        where: { id: id },
      });
      return res
        .status(200)
        .json({ message: "passenger deleted successfully" });
    } catch (error) {
      return res
        .status(500)
        .json({ error, message: "Failed to delete passenger" });
    }
  }
);

// get a passenger
router.get("/:id", verifyTokenAndMarshal || verifyTokenAndDriver ||
    verifyTokenAndSuperUser ||
    verifyTokenAndAdmin,
  async (req: Request, res: Response) => {
    const id = req.params.id;

    // get a passenger
    try {
      const passenger = await db.passenger.findUnique({
        where: { id: id },
      });
      if (!passenger) {
        return res.status(404).json({ message: "passenger not found" });
      }
      return res.status(200).json(serializeObject(passenger));
    } catch (error) {
      return res.status(500).json({ error, message: "Failed to get passenger" });
    }
  }
);

// get all passengers for an association
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
    // get  manifests
    try {
      const passengers = await db.passenger.findMany({
        where: {
          associationId: id,
        },
      });
      return res.status(201).json(serializeObject(passengers));
    } catch (error) {
      return res
        .status(500)
        .json({ error, message: "Failed to get passengers" });
    }
  }
);

export default router;
