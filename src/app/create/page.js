'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Create = () => {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [questions, setQuestions] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('/api/topices', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, questions })
        });

        if (response.ok) {
            const newTopice = await response.json();
            router.push(`/test/${newTopice.id}`); // 생성된 페이지로 이동
            router.refresh(); // 페이지 강제 새로고침으로 최신 데이터 반영
        } else {
            console.error('Failed to create new topic');
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <p>
                    <input
                        type="text"
                        name="title"
                        placeholder="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </p>
                <p>
                    <input
                        type="text"
                        name="questions"
                        placeholder="몇 문제 인가요?"
                        value={questions}
                        onChange={(e) => setQuestions(e.target.value)}
                    />
                </p>
                <p>
                    <input type="submit" value="create" />
                </p>
            </form>
        </>
    );
};

export default Create;
