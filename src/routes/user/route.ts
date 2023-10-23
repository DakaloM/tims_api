import db from "../../config/connection";
import express, { Response, Request } from "express";
import validate from "../../middleware/validateResource";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { createUserSchema } from "../../schema/user.schema";
import { duplicateEmail, duplicatePhone, duplicateSAID } from "../../validation/user";
import randomGenerator from "../../utils/randomGenerator";

const router = express.Router();
dotenv.config();

// add a user Account
router.post(
  "/",
  validate(createUserSchema),
  async (req: Request, res: Response) => {
    const { email, phone, SAID, 
    } =
      req.body;

    const emailExist = await duplicateEmail(email);
    if (emailExist) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const phoneExists = await duplicatePhone(phone);
    if (phoneExists) {
      return res.status(409).json({ message: "Phone already exists" });
    }

    const IDExists = await duplicateSAID(SAID);
    if (IDExists) {
      return res.status(409).json({ message: "ID number already exists" });
    }
    
    //hashing password
    const password = randomGenerator(4);
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);

    try {
      const newUser =  await db.user.create({
        data: {
          ...req.body, password: hashedPassword
        },
      });

      return res.status(201).json({ message: "New account has been added" });
    } catch (error) {
      return res.status(500).json({ error, message: "Failed to create a new user" });
    }
  }
);

export default router;
