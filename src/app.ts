import express from "express"
import config from "config"
import logger from "./utils/logger";
import cors from "cors"
import { MiddleWareProps } from "./types";
import corsOption from "./config/corsOptions";
import cookieParser from "cookie-parser"
import bodyParser from "body-parser";
import authRoutes from "./routes/auth/route"
import associationRoutes from "./routes/association/route";
import userRoutes from "./routes/user/route";
import enumRoutes from "./routes/enum/route"
import associationContactRoutes from "./routes/associationContact/route"

const app = express();
const port = process.env.PORT;

//Middlewares
app.use(({req, res, next} : MiddleWareProps) => {
    //@ts-ignore
    res.header("Access-Control-Allow-Credentials", true);
    next();
})

// give the app the ability to use json
app.use(express.json()); 

// enable cors for dynamic routes
app.use(cors(corsOption))

// enable app to parse cookies
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

//---------------------Routes------------------------------

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/associations", associationRoutes);
app.use("/api/enums", enumRoutes);
// app.use("/api/ranks", rankRoutes);
// app.use("/api/vehicles", vehicleRoutes);
// app.use("/api/routes", routeRoutes);
// app.use("/api/licenses", licenseRoutes);
// app.use("/api/otp", otpRoutes);
app.use("/api/associationContacts", associationContactRoutes);


//---------------------Routes------------------------------




app.listen(port, () => {
    logger.info(`app is running at http://localhost:${port}`)
    
})
