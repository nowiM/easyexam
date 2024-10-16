// app/api/topices/route.js
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// 데이터 파일 경로
const dataFilePath = path.join(process.cwd(), 'src', 'app', 'data.json');
console.log(dataFilePath);

// 데이터 파일을 읽는 함수
const readData = () => {
    const data = fs.readFileSync(dataFilePath, 'utf-8');
    return JSON.parse(data);
};

// 데이터 파일에 쓰는 함수
const writeData = (data) => {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf-8');
};

// GET 요청 처리
export const GET = async () => {
    const topices = readData();
    return NextResponse.json(topices);
};

// POST 요청 처리
export const POST = async (request) => {
    const { title, questions } = await request.json();
    const topices = readData();
    const newTopice = { id: topices.length + 1, title, questions: parseInt(questions) };
    topices.push(newTopice);
    writeData(topices); // 파일에 데이터를 저장
    return NextResponse.json(newTopice, { status: 201 });
};