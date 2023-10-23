-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('SUPERUSER', 'ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('DRIVER', 'STAFF', 'OWNER', 'EXTERNAL', 'COMMUNITY', 'MARSHAL');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('VERIFIED', 'NOT_VERIFIED', 'SUSPENDED', 'PENDING');

-- CreateEnum
CREATE TYPE "LicenseType" AS ENUM ('DRIVER', 'OWNER', 'ROUTE');

-- CreateEnum
CREATE TYPE "LicenseStatus" AS ENUM ('PENDING', 'APPROVED', 'SUSPENDED', 'REJECTED');

-- CreateEnum
CREATE TYPE "VehicleType" AS ENUM ('OWNER', 'ASSOCIATION');

-- CreateEnum
CREATE TYPE "VehicleStatus" AS ENUM ('WORKING', 'SUSPENDED', 'PENDING');

-- CreateEnum
CREATE TYPE "VehicleTripStatus" AS ENUM ('TRIP', 'NO_TRIP');

-- CreateEnum
CREATE TYPE "QueueVehicleStatus" AS ENUM ('WAITING', 'DERPATED', 'REJECTED');

-- CreateEnum
CREATE TYPE "TripType" AS ENUM ('LONG', 'SHORT');

-- CreateEnum
CREATE TYPE "CommunicationType" AS ENUM ('ANNOUNCEMENT', 'REPORT', 'COMPLAINT', 'EMERGENCY', 'ENQUIRY', 'FEES');

-- CreateEnum
CREATE TYPE "FeeType" AS ENUM ('VEHICLE', 'OWNER');

-- CreateEnum
CREATE TYPE "paymentStatus" AS ENUM ('APPROVED', 'PENDING', 'REJECTED', 'MISSING_PROOF');

-- CreateEnum
CREATE TYPE "FeePaymentType" AS ENUM ('ONCE_OFF', 'RECURRING');

-- CreateEnum
CREATE TYPE "PaymentPeriod" AS ENUM ('MONTHLY', 'QUARTELY', 'ANNUALY', 'SEMI_ANUALLY');

-- CreateEnum
CREATE TYPE "VehicleIncomeStatus" AS ENUM ('PENDING', 'COMPLETE');

-- CreateEnum
CREATE TYPE "EmploymentApplicationStatus" AS ENUM ('REJECTED', 'PENDING', 'APPROVED');

-- CreateEnum
CREATE TYPE "RecruitmentStatus" AS ENUM ('OPEN', 'CLOSED');

-- CreateEnum
CREATE TYPE "EmplymentType" AS ENUM ('CONTRACT', 'PERMANENT');

-- CreateEnum
CREATE TYPE "employementPositionStatus" AS ENUM ('FILLED', 'VACANT');

-- CreateEnum
CREATE TYPE "EmployementStatus" AS ENUM ('TERMINATED', 'RESIGNED', 'ACTIVE');

-- CreateEnum
CREATE TYPE "Avalilabity" AS ENUM ('AVAILABLE', 'NOT_AVAILABLE');

-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('DRIVER_LICENSE', 'ROUTE_LICENSE', 'OWNER_LICENCE', 'VEHICLE_DISK');

-- CreateEnum
CREATE TYPE "RecordType" AS ENUM ('FEE_ADJUSTMENT', 'ACCOUNT_CREATION', 'ACCOUNT_UPDATE', 'ROUTES', 'STAFF_HIRING', 'STAFF_TERMINATION', 'QUEUE');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "associationId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "SAID" BIGINT NOT NULL,
    "phone" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "gender" TEXT NOT NULL,
    "image" TEXT,
    "address" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "type" "UserType" NOT NULL,
    "password" TEXT NOT NULL,
    "status" "UserStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT,
    "refreshToken" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Association" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "registrationNumber" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "area" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatesBy" TEXT,

    CONSTRAINT "Association_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssociationContact" (
    "id" TEXT NOT NULL,
    "associationId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" TEXT,
    "image" TEXT,
    "phone" TEXT NOT NULL,
    "names" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "AssociationContact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Otp" (
    "id" TEXT NOT NULL,
    "otp" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Otp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rank" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "associationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "Rank_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Route" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "associationId" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "start" TEXT NOT NULL,
    "eta" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "Route_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "License" (
    "id" TEXT NOT NULL,
    "licenseNumber" TEXT NOT NULL,
    "code" TEXT,
    "issueDate" TEXT NOT NULL,
    "expiryDate" TEXT NOT NULL,
    "file" TEXT NOT NULL,
    "type" "LicenseType" NOT NULL,
    "typeId" TEXT,
    "routeId" TEXT,
    "associationId" TEXT NOT NULL,
    "status" "LicenseStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "License_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vehicle" (
    "id" TEXT NOT NULL,
    "make" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "registrationNumber" TEXT NOT NULL,
    "insured" BOOLEAN NOT NULL,
    "financed" BOOLEAN NOT NULL,
    "status" "VehicleStatus" NOT NULL DEFAULT 'PENDING',
    "routeId" TEXT,
    "associationId" TEXT NOT NULL,
    "area" TEXT,
    "image" TEXT NOT NULL,
    "type" "VehicleType" NOT NULL,
    "ownerId" TEXT,
    "driverIds" TEXT[],
    "currentDriverId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedBy" TEXT,
    "tripStatus" "VehicleTripStatus" NOT NULL DEFAULT 'NO_TRIP',

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Insuarance" (
    "id" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "vehicleid" TEXT NOT NULL,

    CONSTRAINT "Insuarance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Finance" (
    "id" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "vehicleid" TEXT NOT NULL,

    CONSTRAINT "Finance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoutePoint" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "rank" BOOLEAN NOT NULL,
    "coordinates" TEXT NOT NULL,
    "routeId" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "address" TEXT,

    CONSTRAINT "RoutePoint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Queue" (
    "id" TEXT NOT NULL,
    "rankId" TEXT NOT NULL,
    "routeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "Queue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QueueVehicle" (
    "id" TEXT NOT NULL,
    "queueId" TEXT NOT NULL,
    "queueNumber" INTEGER NOT NULL,
    "vehicleId" TEXT,
    "RegistrationNumber" TEXT NOT NULL,
    "driver" TEXT NOT NULL,
    "diskNumber" TEXT NOT NULL,
    "status" "QueueVehicleStatus" NOT NULL DEFAULT 'WAITING',

    CONSTRAINT "QueueVehicle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trip" (
    "id" TEXT NOT NULL,
    "routeId" TEXT NOT NULL,
    "vehicleId" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3),
    "duration" TEXT,
    "type" "TripType" NOT NULL,
    "associationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT,
    "queueId" TEXT,

    CONSTRAINT "Trip_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Manifest" (
    "id" TEXT NOT NULL,
    "tripId" TEXT NOT NULL,
    "associationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "Manifest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Passenger" (
    "id" TEXT NOT NULL,
    "IDNumber" TEXT NOT NULL,
    "fisrtName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "address" TEXT NOT NULL,
    "manifestId" TEXT NOT NULL,
    "associationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "Passenger_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NextOfKin" (
    "id" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "relationship" TEXT NOT NULL,
    "LastName" TEXT NOT NULL,
    "email" TEXT,
    "firstName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "userId" TEXT,
    "passengerId" TEXT,
    "associationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "NextOfKin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Committee" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "associationId" TEXT NOT NULL,

    CONSTRAINT "Committee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommitteeMember" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT NOT NULL,
    "committeeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT,
    "members" JSONB[],

    CONSTRAINT "CommitteeMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Meeting" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT,
    "duration" TEXT NOT NULL,
    "agenda" TEXT NOT NULL,
    "minutes" JSONB[],
    "comitteeId" TEXT NOT NULL,
    "associationId" TEXT NOT NULL,

    CONSTRAINT "Meeting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Communication" (
    "id" TEXT NOT NULL,
    "type" "CommunicationType" NOT NULL,
    "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedBy" TEXT,
    "subject" TEXT NOT NULL,
    "associationId" TEXT NOT NULL,
    "userId" TEXT,

    CONSTRAINT "Communication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "communicationId" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "createdAd" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaxiFare" (
    "id" TEXT NOT NULL,
    "routeId" TEXT NOT NULL,
    "currentPrice" DECIMAL(65,30) NOT NULL,
    "previousPrice" DECIMAL(65,30) NOT NULL,
    "associationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "TaxiFare_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fee" (
    "id" TEXT NOT NULL,
    "type" "FeeType" NOT NULL,
    "userId" TEXT NOT NULL,
    "vehicleId" TEXT,
    "outstandingAmount" DECIMAL(65,30) NOT NULL,
    "payedAmount" DECIMAL(65,30) NOT NULL,
    "datePayed" TIMESTAMP(3) NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "proofOfPayment" TEXT NOT NULL,
    "paymentType" "FeePaymentType" NOT NULL,
    "recurring" "PaymentPeriod" NOT NULL,
    "status" "paymentStatus" NOT NULL DEFAULT 'PENDING',
    "associationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "Fee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VehicleIncome" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "vehicleId" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "status" "VehicleIncomeStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "VehicleIncome_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmploymentApplications" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "SAID" BIGINT NOT NULL,
    "phone" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "gender" TEXT NOT NULL,
    "image" TEXT,
    "address" TEXT NOT NULL,
    "resume" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "positionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedBy" TEXT,
    "status" "EmploymentApplicationStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "EmploymentApplications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApplicationRequirementsAnswer" (
    "id" TEXT NOT NULL,
    "applicantId" TEXT NOT NULL,
    "requirementId" TEXT NOT NULL,
    "requirementQuestion" TEXT NOT NULL,
    "requirementAnswer" TEXT NOT NULL,

    CONSTRAINT "ApplicationRequirementsAnswer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmploymentPost" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "RecruitmentStatus" NOT NULL DEFAULT 'OPEN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "EmploymentPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmploymentPosition" (
    "id" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "areaOfOperation" TEXT NOT NULL,
    "roles" JSONB[],
    "responsibilities" JSONB[],
    "expectations" JSONB[],
    "employementType" "EmplymentType" NOT NULL,
    "contractLength" TEXT,
    "postId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT,
    "status" "employementPositionStatus" NOT NULL DEFAULT 'VACANT',

    CONSTRAINT "EmploymentPosition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PositionRequirement" (
    "id" TEXT NOT NULL,
    "positionId" TEXT NOT NULL,
    "requirement" TEXT NOT NULL,
    "requirementQuestion" TEXT NOT NULL,
    "requirementAnswer" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "PositionRequirement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employement" (
    "id" TEXT NOT NULL,
    "referenceNumber" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "positionId" TEXT NOT NULL,
    "employeeId" TEXT,
    "status" "EmployementStatus" NOT NULL,
    "availability" "Avalilabity" NOT NULL DEFAULT 'NOT_AVAILABLE',

    CONSTRAINT "Employement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Shift" (
    "id" TEXT NOT NULL,
    "startTime" TEXT NOT NULL,
    "knockOffTime" TEXT NOT NULL,
    "emplymentId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "Shift_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Document" (
    "id" TEXT NOT NULL,
    "type" "DocumentType" NOT NULL,
    "issueDate" TIMESTAMP(3) NOT NULL,
    "expiryDate" TIMESTAMP(3) NOT NULL,
    "file" TEXT NOT NULL,
    "ownerId" TEXT,
    "routeId" TEXT,
    "vehicleId" TEXT,
    "driverId" TEXT,
    "associationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Record" (
    "id" TEXT NOT NULL,
    "type" "RecordType" NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "staffId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "message" TEXT,

    CONSTRAINT "Record_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_RankToRoute" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Association_registrationNumber_key" ON "Association"("registrationNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Otp_userId_key" ON "Otp"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "License_licenseNumber_key" ON "License"("licenseNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_registrationNumber_key" ON "Vehicle"("registrationNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Insuarance_vehicleid_key" ON "Insuarance"("vehicleid");

-- CreateIndex
CREATE UNIQUE INDEX "Finance_vehicleid_key" ON "Finance"("vehicleid");

-- CreateIndex
CREATE UNIQUE INDEX "Queue_routeId_key" ON "Queue"("routeId");

-- CreateIndex
CREATE UNIQUE INDEX "QueueVehicle_vehicleId_key" ON "QueueVehicle"("vehicleId");

-- CreateIndex
CREATE UNIQUE INDEX "CommitteeMember_email_key" ON "CommitteeMember"("email");

-- CreateIndex
CREATE UNIQUE INDEX "CommitteeMember_phone_key" ON "CommitteeMember"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "TaxiFare_routeId_key" ON "TaxiFare"("routeId");

-- CreateIndex
CREATE UNIQUE INDEX "EmploymentApplications_email_key" ON "EmploymentApplications"("email");

-- CreateIndex
CREATE UNIQUE INDEX "EmploymentApplications_phone_key" ON "EmploymentApplications"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "ApplicationRequirementsAnswer_applicantId_key" ON "ApplicationRequirementsAnswer"("applicantId");

-- CreateIndex
CREATE UNIQUE INDEX "EmploymentPosition_postId_key" ON "EmploymentPosition"("postId");

-- CreateIndex
CREATE UNIQUE INDEX "PositionRequirement_positionId_key" ON "PositionRequirement"("positionId");

-- CreateIndex
CREATE UNIQUE INDEX "Employement_referenceNumber_key" ON "Employement"("referenceNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Employement_employeeId_key" ON "Employement"("employeeId");

-- CreateIndex
CREATE UNIQUE INDEX "Shift_emplymentId_key" ON "Shift"("emplymentId");

-- CreateIndex
CREATE UNIQUE INDEX "_RankToRoute_AB_unique" ON "_RankToRoute"("A", "B");

-- CreateIndex
CREATE INDEX "_RankToRoute_B_index" ON "_RankToRoute"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_associationId_fkey" FOREIGN KEY ("associationId") REFERENCES "Association"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssociationContact" ADD CONSTRAINT "AssociationContact_associationId_fkey" FOREIGN KEY ("associationId") REFERENCES "Association"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Otp" ADD CONSTRAINT "Otp_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rank" ADD CONSTRAINT "Rank_associationId_fkey" FOREIGN KEY ("associationId") REFERENCES "Association"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Route" ADD CONSTRAINT "Route_associationId_fkey" FOREIGN KEY ("associationId") REFERENCES "Association"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "License" ADD CONSTRAINT "License_associationId_fkey" FOREIGN KEY ("associationId") REFERENCES "Association"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "License" ADD CONSTRAINT "License_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "Route"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_associationId_fkey" FOREIGN KEY ("associationId") REFERENCES "Association"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "Route"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Insuarance" ADD CONSTRAINT "Insuarance_vehicleid_fkey" FOREIGN KEY ("vehicleid") REFERENCES "Vehicle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Finance" ADD CONSTRAINT "Finance_vehicleid_fkey" FOREIGN KEY ("vehicleid") REFERENCES "Vehicle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoutePoint" ADD CONSTRAINT "RoutePoint_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "Route"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Queue" ADD CONSTRAINT "Queue_rankId_fkey" FOREIGN KEY ("rankId") REFERENCES "Rank"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Queue" ADD CONSTRAINT "Queue_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "Route"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QueueVehicle" ADD CONSTRAINT "QueueVehicle_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QueueVehicle" ADD CONSTRAINT "QueueVehicle_queueId_fkey" FOREIGN KEY ("queueId") REFERENCES "Queue"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_associationId_fkey" FOREIGN KEY ("associationId") REFERENCES "Association"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "Route"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_queueId_fkey" FOREIGN KEY ("queueId") REFERENCES "Queue"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Manifest" ADD CONSTRAINT "Manifest_associationId_fkey" FOREIGN KEY ("associationId") REFERENCES "Association"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Manifest" ADD CONSTRAINT "Manifest_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Passenger" ADD CONSTRAINT "Passenger_associationId_fkey" FOREIGN KEY ("associationId") REFERENCES "Association"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Passenger" ADD CONSTRAINT "Passenger_manifestId_fkey" FOREIGN KEY ("manifestId") REFERENCES "Manifest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NextOfKin" ADD CONSTRAINT "NextOfKin_associationId_fkey" FOREIGN KEY ("associationId") REFERENCES "Association"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NextOfKin" ADD CONSTRAINT "NextOfKin_passengerId_fkey" FOREIGN KEY ("passengerId") REFERENCES "Passenger"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NextOfKin" ADD CONSTRAINT "NextOfKin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Committee" ADD CONSTRAINT "Committee_associationId_fkey" FOREIGN KEY ("associationId") REFERENCES "Association"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommitteeMember" ADD CONSTRAINT "CommitteeMember_committeeId_fkey" FOREIGN KEY ("committeeId") REFERENCES "Committee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meeting" ADD CONSTRAINT "Meeting_comitteeId_fkey" FOREIGN KEY ("comitteeId") REFERENCES "Committee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meeting" ADD CONSTRAINT "Meeting_associationId_fkey" FOREIGN KEY ("associationId") REFERENCES "Association"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Communication" ADD CONSTRAINT "Communication_associationId_fkey" FOREIGN KEY ("associationId") REFERENCES "Association"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Communication" ADD CONSTRAINT "Communication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_communicationId_fkey" FOREIGN KEY ("communicationId") REFERENCES "Communication"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaxiFare" ADD CONSTRAINT "TaxiFare_associationId_fkey" FOREIGN KEY ("associationId") REFERENCES "Association"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaxiFare" ADD CONSTRAINT "TaxiFare_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "Route"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fee" ADD CONSTRAINT "Fee_associationId_fkey" FOREIGN KEY ("associationId") REFERENCES "Association"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fee" ADD CONSTRAINT "Fee_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fee" ADD CONSTRAINT "Fee_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmploymentApplications" ADD CONSTRAINT "EmploymentApplications_postId_fkey" FOREIGN KEY ("postId") REFERENCES "EmploymentPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmploymentApplications" ADD CONSTRAINT "EmploymentApplications_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "EmploymentPosition"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationRequirementsAnswer" ADD CONSTRAINT "ApplicationRequirementsAnswer_requirementId_fkey" FOREIGN KEY ("requirementId") REFERENCES "PositionRequirement"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmploymentPosition" ADD CONSTRAINT "EmploymentPosition_postId_fkey" FOREIGN KEY ("postId") REFERENCES "EmploymentPost"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PositionRequirement" ADD CONSTRAINT "PositionRequirement_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "EmploymentPosition"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employement" ADD CONSTRAINT "Employement_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employement" ADD CONSTRAINT "Employement_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "EmploymentPosition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shift" ADD CONSTRAINT "Shift_emplymentId_fkey" FOREIGN KEY ("emplymentId") REFERENCES "Employement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RankToRoute" ADD CONSTRAINT "_RankToRoute_A_fkey" FOREIGN KEY ("A") REFERENCES "Rank"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RankToRoute" ADD CONSTRAINT "_RankToRoute_B_fkey" FOREIGN KEY ("B") REFERENCES "Route"("id") ON DELETE CASCADE ON UPDATE CASCADE;
