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

export const GET = async (request, { params }) => {
    const { id } = params;
    const topices = readData(); // 파일에서 데이터를 읽음

    const topice = topices.find((t) => t.id === parseInt(id));
    if (!topice) {
        return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    return NextResponse.json(topice);
};