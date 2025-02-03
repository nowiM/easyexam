'use client';
import React, { useState, startTransition } from 'react';
import { useRouter } from 'next/navigation';

const TopicUpdateForm = ({ initialData }) => {
    console.log("SubComponents page")
    const [title, setTitle] = useState(initialData.title);
    const [questions, setQuestions] = useState(initialData.questions);
    const router = useRouter();

    const handleUpdate = async () => {
        try {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/topices/${initialData.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, questions }),
            });

            startTransition(() => {
                router.push(`/topice/${initialData.id}`); // 업데이트된 페이지로 이동
            });
        } catch (error) {
            console.error('Error updating item:', error);
        }
    };

    return (
        <>
            <h2>시험과목 수정</h2>

            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="시험 과목을 수정해주세요."
            />

            <input
                type="number"
                value={questions}
                onChange={(e) => setQuestions(e.target.value)}
                min={0}
                max={300}
                placeholder="시험 문제를 수정해주세요."
            />

            <input
                type="button"
                value="Save"
                onClick={handleUpdate}
            />
        </>
    );
};

export default TopicUpdateForm;