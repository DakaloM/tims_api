import db from "../../config/connection";
import express, { Response, Request } from "express";
import validate from "../../middleware/validateResource";
import {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
  verifyTokenAndSuperAccount,
  verifyTokenAndSuperUser,
} from "../../middleware/verifyToken";
import { communicationSchema, updateCommunicationSchema } from "../../schema/communication.schema";
import { duplicateCommunication } from "../../validation/communication";
import { findAssociation } from "../../validation/association";

const router = express.Router();

// Create communication
router.post(
  "/",
  verifyToken,
  validate(communicationSchema),
  async (req: Request, res: Response) => {
    const { type, userId, ...others } = req.body;
    const duplicate = await duplicateCommunication(type, userId);

    if (duplicate) {
      return res.status(409).json({
        message:
          "You still have a similar communication and it is still open, close it first or wait for a response  ",
      });
    }
    // create
    try {
      await db.communication.create({
        data: {
          ...req.body,
        },
      });
      return res.status(201).json({ message: "communication created successfully" });
    } catch (error) {
      return res.status(500).json({ error, message: "Failed to add communication" });
    }
  }
);

// update communication
router.patch(
  "/:id",
  verifyTokenAndAuthorization,
  validate(updateCommunicationSchema),
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const communication = await db.communication.findUnique({
      where: { id: id },
    });
    if (!communication) {
      return res.status(404).json({ message: "communication not found" });
    }

    // update
    try {
      await db.meeting.update({
        where: { id: id },
        data: {
          ...req.body,
        },
      });
      return res.status(200).json({ message: "communication updated successfully" });
    } catch (error) {
      return res
        .status(500)
        .json({ error, message: "Failed to update communication" });
    }
  }
);

// delete a communication
router.delete(
  "/:id",
  verifyTokenAndSuperUser || verifyTokenAndAuthorization,
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const communication = await db.communication.findUnique({
      where: { id: id },
    });

    if (!communication) {
      return res.status(404).json({ message: "communication not found" });
    }

    // delete communication
    try {
      await db.communication.delete({
        where: { id: id },
      });
      return res.status(201).json({ message: "communication deleted successfully" });
    } catch (error) {
      return res
        .status(500)
        .json({ error, message: "Failed to delete communication" });
    }
  }
);

// get a communication
router.get(
  "/:id",
  verifyToken,
  async (req: Request, res: Response) => {
    const id = req.params.id;

    // get a meeting
    try {
      const communication = await db.communication.findUnique({
        where: { id: id },
      });
      if (!communication) {
        return res.status(404).json({ message: "communication not found" });
      }
      return res.status(200).json(communication);
    } catch (error) {
      return res.status(500).json({ error, message: "Failed to get communication" });
    }
  }
);

// get all communication
router.get("/", verifyTokenAndSuperAccount, async (req: Request, res: Response) => {
  // get all communication
  try {
    const communications = await db.communication.findMany();
    return res.status(201).json(communications);
  } catch (error) {
    return res
      .status(500)
      .json({ error, message: "Failed to retrieve communication" });
  }
});

// get all communications for aa association
router.get(
  "/association/:associationId",
  verifyTokenAndAdmin,
  async (req: Request, res: Response) => {
    const id = req.params.associationId;
    const association = await findAssociation(id);

    if (!association) {
      return res.status(404).json({ message: "association not found" });
    }
    // get all meetings
    try {
      const communications = await db.communication.findMany({
        where: {
          associationId: id,
        },
      });
      return res.status(201).json(communications);
    } catch (error) {
      return res
        .status(500)
        .json({ error, message: "Failed to retrieve communications" });
    }
  }
);
// get all communications for a user
router.get(
  "/user/:userId",
  verifyToken,
  async (req: Request, res: Response) => {
    const id = req.params.userId;
    const user = await db.user.findUnique({
      where: { id: id },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // get all communications
    try {
      const communications = await db.communication.findMany({
        where: {
          userId: id,
        },
      });
      return res.status(201).json(communications);
    } catch (error) {
      return res
        .status(500)
        .json({ error, message: "Failed to retrieve communications" });
    }
  }
);

export default router;
