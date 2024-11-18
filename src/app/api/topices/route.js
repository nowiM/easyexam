// app/api/topices/route.js
import { NextResponse } from 'next/server';
import connectDB from '../../db/connect';
import Topice from '../../db/models/Topice';

export const GET = async () => {
    await connectDB();
    const topices = await Topice.find(); // MongoDB에서 모든 토픽 데이터를 가져옴
    return NextResponse.json(topices);
};

export const POST = async (request) => {
    await connectDB();
    const { id, title, questions } = await request.json();
    const newTopice = new Topice({
        id,
        title,
        questions: parseInt(questions)
    });
    const savedTopice = await newTopice.save(); // MongoDB에 새로운 토픽 저장
    return NextResponse.json(savedTopice, { status: 201 });
};
