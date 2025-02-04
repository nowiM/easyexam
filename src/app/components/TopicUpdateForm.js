'use client';
import React, { useState, startTransition } from 'react';
import { useRouter } from 'next/navigation';
import handleUpdate from '../utils/handleUpdate';

const TopicUpdateForm = ({ topiceData }) => {
    const [title, setTitle] = useState(topiceData.title);
    const [questions, setQuestions] = useState(topiceData.questions);
    const id = topiceData.id;
    const router = useRouter();

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
                onClick={() => handleUpdate(id, router, title, questions, startTransition)}
            />
        </>
    );
};

export default TopicUpdateForm;