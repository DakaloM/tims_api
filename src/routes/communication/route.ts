import db from "../../config/connection";
import express, { Response, Request } from "express";
import validate from "../../middleware/validateResource";
import {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
  verifyTokenAndSuperUser,
} from "../../middleware/verifyToken";
import { communicationSchema, updateCommunicationSchema } from "../../schema/communication.schema";
import { duplicateCommunication } from "../../validation/communication";

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
      return res.status(200).json({ message: "meeting updated successfully" });
    } catch (error) {
      return res
        .status(500)
        .json({ error, message: "Failed to update meeting" });
    }
  }
);

// delete a meeting
router.delete(
  "/:id",
  verifyTokenAndSuperUser,
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const meeting = await db.meeting.findUnique({
      where: { id: id },
    });

    if (!meeting) {
      return res.status(404).json({ message: "meeting not found" });
    }

    // delete meeting
    try {
      await db.meeting.delete({
        where: { id: id },
      });
      return res.status(201).json({ message: "meeting deleted successfully" });
    } catch (error) {
      return res
        .status(500)
        .json({ error, message: "Failed to delete meeting" });
    }
  }
);

// get a meeting
router.get(
  "/:id",
  verifyTokenAndAuthorization,
  async (req: Request, res: Response) => {
    const id = req.params.id;

    // get a meeting
    try {
      const meeting = await db.meeting.findUnique({
        where: { id: id },
      });
      if (!meeting) {
        return res.status(404).json({ message: "meeting not found" });
      }
      return res.status(200).json(meeting);
    } catch (error) {
      return res.status(500).json({ error, message: "Failed to get meeting" });
    }
  }
);

// get all meetings
router.get("/", async (req: Request, res: Response) => {
  // get all meetings
  try {
    const meetings = await db.meeting.findMany();
    return res.status(201).json(meetings);
  } catch (error) {
    return res
      .status(500)
      .json({ error, message: "Failed to retrieve meetings" });
  }
});

// get all meetings for aa association
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
      const meetings = await db.meeting.findMany({
        where: {
          associationId: id,
        },
      });
      return res.status(201).json(meetings);
    } catch (error) {
      return res
        .status(500)
        .json({ error, message: "Failed to retrieve meetings" });
    }
  }
);
// get all meetings for a committee
router.get(
  "/committee/:committeeId",
  verifyTokenAndAdmin,
  async (req: Request, res: Response) => {
    const id = req.params.committeeId;
    const committee = await db.committee.findUnique({
      where: { id: id },
    });

    if (!committee) {
      return res.status(404).json({ message: "Committee not found" });
    }
    // get all meetings
    try {
      const meetings = await db.meeting.findMany({
        where: {
          committeeId: id,
        },
      });
      return res.status(201).json(meetings);
    } catch (error) {
      return res
        .status(500)
        .json({ error, message: "Failed to retrieve meetings" });
    }
  }
);

export default router;
