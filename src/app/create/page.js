// app/create/page.js
'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Create = () => {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [questions, setQuestions] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const fristResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/topices`);
        const data = await fristResponse.json();
        const id = data.length === 0 ? 1 : data[data.length - 1].id + 1

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/topices`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, title, questions })
        });

        if (response.ok) {
            const newTopice = await response.json();
            router.push(`/topice/${newTopice.id}`); // 생성된 페이지로 이동
            router.refresh(); // 페이지 강제 새로고침으로 최신 데이터 반영
        } else {
            console.error('Failed to create new topic');
        }
    };

    return (
        <>
            <div className="createCotainer">
                <h2>시험과목 생성</h2>
                <form className='createForm' onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="시험 과목을 입력해주세요."
                        />

                    <input
                        type="number"
                        name="questions"
                        value={questions}
                        min={0}
                        max={300}
                        onChange={(e) => setQuestions(e.target.value)}
                        placeholder="몇 문제 인가요?"
                    />

                    <input 
                        type="submit" 
                        value="Create" 
                    />
                </form>
            </div>
        </>
    );
};

export default Create;
