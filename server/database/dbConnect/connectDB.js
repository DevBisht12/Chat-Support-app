import mongoose from 'mongoose';

const connectDB = async (DATABASE_URL) => {
    try {
        const DB_OPTIONS = {
            dbName: "supportCartApp",
        };

        await mongoose.connect(DATABASE_URL, DB_OPTIONS);
        console.log("Connected to database successfully 🚀");
    } catch (error) {
        console.error("Error connecting to database", error);
        return Promise.reject(error);
    }
};

export default connectDB;
