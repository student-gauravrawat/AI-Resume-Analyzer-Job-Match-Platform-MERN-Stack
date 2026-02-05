import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import helmet from "helmet"
import errorHandler from "./middlewares/error.middleware.js"


const app = express()

app.use(helmet({
    crossOriginResourcePolicy: {policy: "cross-origin"}
}));
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));
app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit: "16kb"}));
app.use(express.static("public"));
app.use(cookieParser());

//? route import 
import userRouter from "./routes/user.route.js"
import resumeRouter from "./routes/resume.route.js"
import jobMatchRouter from "./routes/jobMatch.route.js"

//? routes declaration
app.use("/api/v1/users", userRouter)
app.use("/api/v1/resumes", resumeRouter)
app.use("/api/v1/jobMatch", jobMatchRouter)

app.use(errorHandler)
export {app}