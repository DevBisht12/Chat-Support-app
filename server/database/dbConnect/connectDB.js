import mongoose from 'mongoose';

const connectDB = async (DATABASE_URL) => {
    try {
        const DB_OPTIONS = {
            dbName: "supportCartApp",
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            tls: true,
            tlsAllowInvalidCertificates: true, // Use only for testing, not recommended for production
            // tlsInsecure: true // Use only for testing, not recommended for production
        };

        await mongoose.connect(DATABASE_URL, DB_OPTIONS);
        console.log("Connected to database successfully 🚀");
    } catch (error) {
        console.error("Error connecting to database", error);
        return Promise.reject(error);
    }
};

export default connectDB;
