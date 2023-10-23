import dotenv from "dotenv"
import { PrismaClient } from "@prisma/client";
  
dotenv.config();


const port = process.env.PORT;
const dbUri = process.env.DATABASE_URL;
const db = new PrismaClient()

export default db
