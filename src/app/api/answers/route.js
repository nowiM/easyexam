import { NextResponse } from 'next/server';
import connectDB from '../../db'; // MongoDB 연결
import Answer from '../../models/Anwser'; // 모델

export const GET = async () => {
    await connectDB()
    const answers = await Answer.find();
    return NextResponse.json(answers);
}

export const POST = async (request) => {
    try {
        await connectDB(); // MongoDB 연결

        // 클라이언트로부터 전송된 데이터 받기
        const { answers } = await request.json();
        
        // answers가 배열인지 확인
        if (!Array.isArray(answers)) {
            return NextResponse.json({ error: 'answers should be an array' }, { status: 400 });
        }

        // 새로운 답안 문서 생성 및 저장
        const newAnswer = new Answer({
            answers: [
                {
                    question: answers[0].question,
                    answer: answers[0].answer,
                }
            ]
        });
        const savedAnswer = await newAnswer.save();
        
        const realAnswers = await Answer.find();
        console.log(realAnswers[realAnswers.length - 1].answer);
        // 저장된 데이터를 JSON으로 응답
        return NextResponse.json(savedAnswer, { status: 201 });
    } catch (error) {
        console.error('Error saving answer:', error);
        return NextResponse.json({ error: 'Failed to save answer' }, { status: 500 });
    }
};
