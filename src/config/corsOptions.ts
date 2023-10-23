import allowedOrigin from "./allowedOrigin";

const corsOption = {
    origin: (origin: any, callback: any) => {
        if(allowedOrigin.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
}

export default corsOption