import dotenv from 'dotenv';
dotenv.config({path:"./.env"});
import express from 'express';
import authRouter from './src/routes/auth.route.js';
import userRouter from './src/routes/user.route.js';
import videoRouter from './src/routes/video.route.js';
import commentRouter from './src/routes/comment.route.js';
import customError from './src/utils/customError.js';
import cookieParser from 'cookie-parser';
import { rateLimit } from 'express-rate-limit';
import helmet from 'helmet';
import hpp from 'hpp';
import sanitize from 'express-mongo-sanitize';
import cors from 'cors';

const limiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    limit:1000,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    message:"To many request please try again after one hour"
});

const app = express();
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}));
app.use(helmet());
app.use("/api",limiter);
app.use(express.json({limit:"16kb"}));
app.use(sanitize());
app.use(express.urlencoded({extended:true,limit:"16kb"}));
app.use(cookieParser());
app.use(hpp());

app.use("/api/v1/auth",authRouter);
app.use("/api/v1/users",userRouter);
app.use("/api/v1/videos",videoRouter);
app.use("/api/v1/comments",commentRouter);

app.use(customError);

export default app;