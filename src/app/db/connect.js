import mongoose from 'mongoose';

let isConnected = 0; // 연결 상태를 캐시

const connectDB = async () => {
    if (isConnected) {
        console.log('MongoDB is already connected.');
        return;
    }

    try {
        console.log('Attempting to connect to MongoDB...');
        const connection = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        isConnected = connection.connections[0].readyState; // 연결 상태 저장
        console.log('MongoDB Connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw new Error('Failed to connect to MongoDB');
    }
};

export default connectDB;
