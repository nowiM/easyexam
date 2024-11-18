// app/api/topices/[id]/route.js
import { NextResponse } from 'next/server';
import Topice from '../../../db/models/Topice'; // Mongoose 모델

// GET 요청: 특정 id의 데이터를 조회
export const GET = async (request, { params }) => {
    try {
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

// PUT 요청: 특정 id의 데이터를 업데이트
export const PUT = async (request, { params }) => {
    try {
        const { id } = params;
        const { title, question } = await request.json(); // Assume only updating title and question
        console.log(title, question);

        // Update title and question fields
        const updatedTopice = await Topice.findOneAndUpdate(
            { id: parseInt(id) },
            { title, questions: question }, // Update both title and question fields
            { new: true } // Option to return the updated document
        );
        console.log(updatedTopice);
        
        if (!updatedTopice) {
            return NextResponse.json({ error: 'Item not found' }, { status: 404 });
        }

        return NextResponse.json(updatedTopice, { status: 200 });
    } catch (error) {
        console.error('Error updating topic:', error);
        return NextResponse.json({ error: 'Failed to update topic' }, { status: 500 });
    }
};


