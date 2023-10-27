import dotenv from "dotenv"
import { PrismaClient } from "@prisma/client";
      
const db = new PrismaClient() 


export default db
