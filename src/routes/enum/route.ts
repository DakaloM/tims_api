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
// get contact status
router.get("/contactStatus", async (req: Request, res: Response) => {
  const status = ContactStatus;
  return res.status(200).json(status);
});
// get LicenseType
router.get("/licenseType", async (req: Request, res: Response) => {
  const data = LicenseType;
  return res.status(200).json(data);
});
// get LicenseStatus
router.get("/licenseStatus", async (req: Request, res: Response) => {
  const data = LicenseStatus;
  return res.status(200).json(data);
});
// get VehicleType
router.get("/vehicleType", async (req: Request, res: Response) => {
  const data = VehicleType;
  return res.status(200).json(data);
});
// get VehicleStatus
router.get("/vehicleStatus", async (req: Request, res: Response) => {
  const data = VehicleStatus;
  return res.status(200).json(data);
});
// get VehicleTripStatus
router.get("/vehicleTripStatus", async (req: Request, res: Response) => {
  const data = VehicleTripStatus;
  return res.status(200).json(data);
});
// get QueueVehicleStatus
router.get("/queueVehicleStatus", async (req: Request, res: Response) => {
  const data = QueueVehicleStatus;
  return res.status(200).json(data);
});
// get TripType
router.get("/tripType", async (req: Request, res: Response) => {
  const data = TripType;
  return res.status(200).json(data);
});
// get CommunicationType
router.get("/communicationType", async (req: Request, res: Response) => {
  const data = CommunicationType;
  return res.status(200).json(data);
});
// get FeeType
router.get("/feeType", async (req: Request, res: Response) => {
  const data = FeeType;
  return res.status(200).json(data);
});
// get paymentStatus
router.get("/paymentStatus", async (req: Request, res: Response) => {
  const data = paymentStatus;
  return res.status(200).json(data);
});
// get FeePaymentType
router.get("/feePaymentType", async (req: Request, res: Response) => {
  const data = FeePaymentType;
  return res.status(200).json(data);
});
// get PaymentPeriod
router.get("/paymentPeriod", async (req: Request, res: Response) => {
  const data = PaymentPeriod;
  return res.status(200).json(data);
});
// get VehicleIncomeStatus
router.get("/vehicleIncomeStatus", async (req: Request, res: Response) => {
  const data = VehicleIncomeStatus;
  return res.status(200).json(data);
});
// get EmploymentApplicationStatus
router.get("/employmentApplicationStatus", async (req: Request, res: Response) => {
  const data = EmploymentApplicationStatus;
  return res.status(200).json(data);
});
// get RecruitmentStatus
router.get("/recruitmentStatus", async (req: Request, res: Response) => {
  const data = RecruitmentStatus;
  return res.status(200).json(data);
});
// get EmploymentType
router.get("/employmentType", async (req: Request, res: Response) => {
  const data = EmploymentType;
  return res.status(200).json(data);
});
// get EmploymentType
router.get("/employmentType", async (req: Request, res: Response) => {
  const data = EmploymentType;
  return res.status(200).json(data);
});
// get EmploymentPositionStatus
router.get("/employmentPositionStatus", async (req: Request, res: Response) => {
  const data = EmploymentPositionStatus;
  return res.status(200).json(data);
});
// get EmploymentStatus
router.get("/employmentStatus", async (req: Request, res: Response) => {
  const data = EmploymentStatus;
  return res.status(200).json(data);
});
// get Availability
router.get("/availability", async (req: Request, res: Response) => {
  const data = Availability;
  return res.status(200).json(data);
});
// get DocumentType
router.get("/documentType", async (req: Request, res: Response) => {
  const data = DocumentType;
  return res.status(200).json(data);
});
// get RecordType
router.get("/recordType", async (req: Request, res: Response) => {
  const data = RecordType;
  return res.status(200).json(data);
});

export default router;
