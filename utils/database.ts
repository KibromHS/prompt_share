import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log('MongoDB already connected!');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI!, {
            dbName: 'prompt_share',
            // serverSelectionTimeoutMS: 30000,
        });

        isConnected = true;

        console.log('MongoDB Connected');
    } catch (e) {
        console.error(e);
    }
}