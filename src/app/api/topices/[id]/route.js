// app/api/topices/[id]/route.js
import { NextResponse } from 'next/server';
import connectDB from '../../../db/connect'; // MongoDB 연결
import Topice from '../../../db/models/Topice'; // Mongoose 모델

// GET 요청: 특정 id의 데이터를 조회
export const GET = async (request, { params }) => {
    try {
        await connectDB(); // MongoDB 연결
        const { id } = params;

        // id로 데이터를 조회
        const topice = await Topice.findOne({ id: parseInt(id) });

        if (!topice) {
            return NextResponse.json({ error: 'Not found' }, { status: 404 });
        }

        // JSON으로 조회된 데이터 반환
        return NextResponse.json(topice);
    } catch (error) {
        console.error('Error fetching topic:', error);
        return NextResponse.json({ error: 'Failed to fetch topic' }, { status: 500 });
    }
};

// DELETE 요청: 특정 id의 데이터를 삭제
export const DELETE = async (request, { params }) => {
    try {
        await connectDB(); // MongoDB 연결
        const { id } = params;

        // id로 데이터를 삭제
        const deletedTopice = await Topice.findOneAndDelete({ id: parseInt(id) });

        if (!deletedTopice) {
            return NextResponse.json({ error: 'Item not found' }, { status: 404 });
        }

        // 성공적으로 삭제되었을 때 반환
        return NextResponse.json({ status: 'success', message: 'Item deleted successfully' });
    } catch (error) {
        console.error('Error deleting topic:', error);
        return NextResponse.json({ error: 'Failed to delete topic' }, { status: 500 });
    }
};
