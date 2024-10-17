// app/api/topices/[id]/route.js

import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'src', 'app', 'data.json');

// 데이터 파일을 읽는 함수
const readData = () => {
    const data = fs.readFileSync(dataFilePath, 'utf-8');
    return JSON.parse(data);
};

// 데이터 파일에 쓰는 함수
const writeData = (data) => {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

export const GET = async (request, { params }) => {
    const { id } = params;
    const topices = readData(); // 파일에서 데이터를 읽음

    const topice = topices.find((t) => t.id === parseInt(id));
    if (!topice) {
        return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    return NextResponse.json(topice);
};

// DELETE 함수 추가
export const DELETE = async (request, { params }) => {
    const { id } = params;
    let topices = readData(); // 파일에서 데이터를 읽음

    // id와 일치하지 않는 항목만 남겨 새로운 데이터 배열 생성
    const updatedTopices = topices.filter((t) => t.id !== parseInt(id));

    if (updatedTopices.length === topices.length) {
        // 항목이 삭제되지 않았을 경우 (해당 id의 항목을 찾지 못한 경우)
        return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    // 변경된 데이터를 파일에 저장
    writeData(updatedTopices);

    return NextResponse.json({ status: 'success', message: 'Item deleted successfully' });
};
