import db from "../../config/connection";
import express, { Response, Request } from "express";
import validate from "../../middleware/validateResource";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { createUserSchema } from "../../schema/user.schema";
import {
  duplicateEmail,
  duplicatePhone,
  duplicateSAID,
} from "../../validation/user";
import randomGenerator from "../../utils/randomGenerator";
import { verifyTokenAndAdmin } from "../../middleware/verifyToken";
import {
  UserRole,
  UserType,
  UserStatus,
  ContactStatus,
  LicenseType,
  LicenseStatus,
  VehicleStatus,
  VehicleType,
  VehicleTripStatus,
  QueueVehicleStatus,
  TripType,
  CommunicationType,
  FeeType,
  paymentStatus,
  PaymentPeriod, FeePaymentType, VehicleIncomeStatus,
  EmploymentApplicationStatus, RecruitmentStatus,
  EmploymentStatus, EmploymentType, EmploymentPositionStatus,
  DocumentType, RecordType, Availability

} from "@prisma/client";

const router = express.Router();
dotenv.config();

// get user types
router.get("/userTypes", async (req: Request, res: Response) => {
  const userTypes = UserType;
  return res.status(200).json(userTypes);
});

// get user roles
router.get("/userRoles", async (req: Request, res: Response) => {
  const UserRoles = UserRole;
  return res.status(200).json(UserRoles);
});

// get user status
router.get("/userStatus", async (req: Request, res: Response) => {
  const status = UserStatus;
  return res.status(200).json(status);
});

export default router;
