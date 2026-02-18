import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        // Log to verify the URI is loaded
        if (!process.env.MANGODB_URI) {
            console.error("❌ MANGODB_URI is missing from .env");
            return;
        }

        await mongoose.connect(process.env.MANGODB_URI, {
            family: 4 // Keep this here just in case
        });
        
        console.log("✅ SUCCESS: Connected to MongoDB");
    } catch (error) {
        console.error("❌ Connection failed again:", error.message);
    }
};