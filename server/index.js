import dotenv from 'dotenv';
dotenv.config({path:"./.env"});
import app from "./app.js";
import dbConnect from './src/database/database.js';

process.on("uncaughtException",((error)=>{
    console.log("Uncaught Exception");
    console.log(error);
    process.exit(1);
}));

process.on("unhandledRejection",((error)=>{
    console.log("Unhandled Promise");
    console.log(error);
    process.exit(1);
}));

const PORT = process.env.PORT || 3000;

dbConnect().then(()=>{
    app.listen(PORT,()=>{
        // console.log("server is listening at PORT",PORT);
    });
}).catch((error)=>{
    console.log("DB and server connection failed");
});