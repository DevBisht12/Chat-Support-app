import mongoose from 'mongoose';

const connectDB = async (DATABASE_URL) => {
    try {
        const DB_OPATIONS={
            dbName:"suportCartApp",
        }
        await mongoose.connect(DATABASE_URL,DB_OPATIONS);
        console.log("Connected to database successfully 🚀");
        
    } catch (error) {
        return Promise.reject(error);
    }
}

export default connectDB;