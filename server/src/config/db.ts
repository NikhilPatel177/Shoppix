import mongoose from "mongoose";
import { env } from "./env";

export const connectDb = async () => {
    try {
        await mongoose.connect(env.MONGO_URI)
        console.log(`Database connected ✅`)
    } catch (error) {
        console.log(`Database error ❌ : ${error}`)
        process.exit(1)
    }
}