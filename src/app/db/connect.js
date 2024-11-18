import mongoose from 'mongoose';

const connectDB = async () => {
    console.log('Attempting to connect to MongoDB...');

    if (mongoose.connection.readyState >= 1) {
        console.log('MongoDB already connected.');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

export default connectDB;
