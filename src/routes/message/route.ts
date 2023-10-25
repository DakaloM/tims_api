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
import { messageSchema } from "../../schema/message.schema";

const router = express.Router();

// Create message
router.post(
  "/",
  verifyToken,
  validate(messageSchema),
  async (req: Request, res: Response) => {
   
    // create
    try {
      await db.message.create({
        data: {
          ...req.body,
        },
      });
      return res.status(201).json({ message: "message created successfully" });
    } catch (error) {
      return res.status(500).json({ error, message: "Failed to add message" });
    }
  }
);

// get all messages for a communication
router.get("/communication/:communicationId", verifyTokenAndSuperAccount, async (req: Request, res: Response) => {
    const id = req.params.communicationId;

    const communication = await db.communication.findUnique({
        where: {
            id: id
        }
    })

    if(!communication) {
        return res.status(404).json({Message : "Communication not found"})
    }
    // get all communication
  try {
    const messages = await db.message.findMany({
        where: {
            communicationId: id
        }
    });
    return res.status(201).json(messages);
  } catch (error) {
    return res
      .status(500)
      .json({ error, message: "Failed to retrieve messages" });
  }
});


export default router;
