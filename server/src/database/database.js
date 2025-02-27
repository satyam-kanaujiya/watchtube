import mongoose from "mongoose";

async function dbConnect() {
    try {
        const response = await mongoose.connect(`${process.env.DB_URI}/${process.env.DB_NAME}`);
    } catch (error) {
        console.log("DB connection failed");
        process.exit(1);
    }
};

export default dbConnect;