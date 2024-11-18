// app/api/answers/route.js
import { NextResponse } from 'next/server'; 
import connectDB from '../../db/connect'; // MongoDB 연결
import AnswerList from '../../db/models/AnwserList'; // 모델

export const GET = async () => {
    await connectDB();
    const answerList = await AnswerList.find();
    return NextResponse.json(answerList);
};

export const POST = async (request) => {
    await connectDB();
    try {
        const { id, answers } = await request.json();

        // id가 존재하면 업데이트, 없으면 새로 생성
        const updateOptions = { upsert: true, new: true }; // upsert: true -> 없으면 새로 생성, new: true -> 업데이트된 문서 반환
        const updatedAnswerList = await AnswerList.findOneAndUpdate(
            { id },  // 조건: 해당 id가 있는지 확인
            { id, answers }, // 업데이트할 데이터
            updateOptions  // upsert 옵션 설정
        );

        return NextResponse.json(updatedAnswerList, { status: 201 });
    } catch (error) {
        console.error('AnswerList UpDate error:', error);
        return NextResponse.json({ error: 'Failed to save or update answers' }, { status: 500 });
    }
};

export const DELETE = async (request) => {
    try {
        await connectDB();

        // 쿼리 파라미터에서 id를 추출
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Missing id' }, { status: 400 });
        }

        // 해당 id를 가진 문서 삭제
        const deletedAnswerList = await AnswerList.findOneAndDelete({ id });
        console.log(deletedAnswerList);
        if (!deletedAnswerList) {
            return NextResponse.json({ error: 'No data found for the given id' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Answer list deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error('AnswerList Delete error:', error);
        return NextResponse.json({ error: 'Failed to delete answer list' }, { status: 500 });
    }
};
